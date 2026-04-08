let audioCtx: AudioContext | null = null;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

function getAudioContext(): AudioContext | null {
    if (typeof window !== 'undefined' && !audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    return audioCtx;
}

export function fractionToPitch(numerator: number, denominator: number) {
    if (denominator === 0) return;
    const value = numerator / denominator;
    const baseFreq = 261.63;
    const freq = baseFreq * (1 + value);
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
}

// Keep track of current audio/utterance to allow stopping
let currentAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Memainkan teks menggunakan kualitas suara tinggi (Google TTS Proxy)
 * Jika gagal, akan fallback ke Web Speech API browser.
 */
export async function playText(text: string, rate: number = 1.0) {
    console.log("[TTS] Meminta pengucapan:", text);

    // 1. Hentikan suara yang sedang berjalan
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    // 2. STRATEGI UTAMA: Gunakan Cloud TTS Proxy (Suara "Mba Google" yang Jelas)
    try {
        const ttsUrl = `${API_URL}/tts?text=${encodeURIComponent(text)}`;
        const audio = new Audio();
        audio.crossOrigin = 'anonymous'; // Wajib untuk CORS pada elemen media

        // Simpan referensi agar tidak di-GC oleh browser selama proses loading/playing
        currentAudio = audio;

        audio.src = ttsUrl;
        audio.playbackRate = rate;

        console.log("[TTS] Mencoba memutar dari Cloud Proxy...");

        await new Promise((resolve, reject) => {
            // Gunakan event 'loadeddata' atau 'canplaythrough' sebelum memanggil play()
            audio.oncanplaythrough = () => {
                console.log("[TTS] Data suara siap, memulai pemutaran...");
                audio.play().catch(reject);
            };

            audio.onplay = () => {
                console.log("[TTS] Sedang memutar suara...");
                resolve(true);
            };

            audio.onended = () => {
                console.log("[TTS] Pemutaran selesai");
                currentAudio = null;
            };

            audio.onerror = (e) => {
                console.warn("[TTS] Gagal memuat audio dari Cloud Proxy:", e);
                currentAudio = null;
                reject(e);
            };
        });

        return;
    } catch (e) {
        // Fallback ke Web Speech API jika Proxy gagal
        playBrowserTTS(text, rate);
    }
}

/**
 * Fallback: Menggunakan Web Speech API bawaan browser.
 */
function playBrowserTTS(text: string, rate: number = 1.0) {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;

    utterance.lang = 'id-ID';
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const highQualityVoice = voices.find(v =>
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft')) &&
        v.lang.startsWith('id')
    );

    if (highQualityVoice) {
        utterance.voice = highQualityVoice;
    }

    utterance.onend = () => {
        if (activeUtterance === utterance) activeUtterance = null;
    };

    console.log("[TTS] Menggunakan Browser Fallback...");
    window.speechSynthesis.speak(utterance);
}

// Pre-init voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
