/**
 * Memainkan nada berdasarkan nilai pecahan.
 * Semakin besar nilai pecahan, semakin tinggi pitchnya.
 * @param numerator Pembilang
 * @param denominator Penyebut
 */
export function fractionToPitch(numerator: number, denominator: number) {
    if (denominator === 0) return;

    const value = numerator / denominator;

    // Base frequency (C4)
    const baseFreq = 261.63;

    // Mapping value (0 - 1+) to frequency
    // Kita buat range 1 oktaf untuk 0 sampai 1
    const freq = baseFreq * (1 + value);

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
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
