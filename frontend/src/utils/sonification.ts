let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    return audioCtx;
}

/**
 * Memainkan nada berdasarkan nilai pecahan.
 * Semakin besar nilai pecahan, semakin tinggi pitchnya.
 */
export function fractionToPitch(numerator: number, denominator: number) {
    if (denominator === 0) return;

    const value = numerator / denominator;
    const baseFreq = 261.63;
    const freq = baseFreq * (1 + value);

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
        ctx.resume();
    }

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

/**
 * Mendapatkan voice Indonesia yang tersedia.
 * Menunggu hingga voices ter-load (di beberapa browser voices load secara async).
 */
function getIndonesianVoice(): Promise<SpeechSynthesisVoice | null> {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();

        if (voices.length > 0) {
            const idVoice = voices.find(v =>
                v.lang === 'id-ID' || v.lang === 'id' || v.lang.startsWith('id')
            );
            resolve(idVoice || null);
            return;
        }

        // Voices belum ter-load, tunggu event
        const onVoicesChanged = () => {
            const loadedVoices = window.speechSynthesis.getVoices();
            const idVoice = loadedVoices.find(v =>
                v.lang === 'id-ID' || v.lang === 'id' || v.lang.startsWith('id')
            );
            window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
            resolve(idVoice || null);
        };

        window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

        // Timeout fallback jika event tidak pernah fire
        setTimeout(() => {
            window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
            const fallbackVoices = window.speechSynthesis.getVoices();
            const idVoice = fallbackVoices.find(v =>
                v.lang === 'id-ID' || v.lang === 'id' || v.lang.startsWith('id')
            );
            resolve(idVoice || null);
        }, 2000);
    });
}

// Pre-load voices saat modul di-import
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
        window.speechSynthesis.getVoices();
    });
}

export async function playText(text: string, rate: number = 1.0) {
    if (!('speechSynthesis' in window)) {
        console.warn("Web Speech API not supported");
        return;
    }

    // Cancel previous speech
    window.speechSynthesis.cancel();

    // Workaround: beberapa browser membutuhkan jeda setelah cancel
    await new Promise(r => setTimeout(r, 100));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Coba set voice Indonesia secara eksplisit
    const idVoice = await getIndonesianVoice();
    if (idVoice) {
        utterance.voice = idVoice;
        console.log(`Using voice: ${idVoice.name} (${idVoice.lang})`);
    } else {
        console.warn("Voice Indonesia tidak ditemukan, menggunakan default dengan lang id-ID");
    }

    // Error handler
    utterance.onerror = (e) => {
        console.error("Speech synthesis error:", e.error);
    };

    window.speechSynthesis.speak(utterance);

    // Workaround untuk bug Chromium di Linux: speech berhenti setelah ~15 detik
    // Resume secara berkala untuk teks panjang
    const resumeInterval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
            clearInterval(resumeInterval);
        } else {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
        }
    }, 10000);

    utterance.onend = () => clearInterval(resumeInterval);
}
