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
 * @param numerator Pembilang
 * @param denominator Penyebut
 */
export function fractionToPitch(numerator: number, denominator: number) {
    if (denominator === 0) return;

    const value = numerator / denominator;
    const baseFreq = 261.63; // Base frequency (C4)
    const freq = baseFreq * (1 + value);

    const ctx = getAudioContext();
    if (!ctx) return;

    // Resuming context if it was suspended (browser policy)
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

export function playText(text: string, rate: number = 1.0) {
    if ('speechSynthesis' in window) {
        // Cancel previous speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID'; // Indonesian
        utterance.rate = rate;    // Speed control
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    } else {
        console.warn("Web Speech API not supported");
    }
}
