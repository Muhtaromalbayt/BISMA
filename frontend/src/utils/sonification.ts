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

// Global reference to prevent garbage collection mid-speech
let activeUtterance: SpeechSynthesisUtterance | null = null;

export function playText(text: string, rate: number = 1.0) {
    if (!('speechSynthesis' in window)) {
        console.error("Speech not supported");
        return;
    }

    // Cancel and speak IMMEDIATELY (no setTimeout)
    // to preserve "User Gesture" trust in browsers.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    console.log("Active utterance count:", !!activeUtterance); // Satisfy TS read

    utterance.lang = 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Indonesian voice lookup
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v =>
        v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia')
    );

    if (idVoice) {
        utterance.voice = idVoice;
    }

    utterance.onend = () => { activeUtterance = null; };
    utterance.onerror = (e) => { console.error("Speech Error:", e); };

    // Resume just in case it's stuck
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }

    console.log("Speaking (id-ID):", text);
    window.speechSynthesis.speak(utterance);
}

// Pre-init voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}
