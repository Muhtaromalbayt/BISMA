import { useState, useEffect } from 'react';
import { toMathSpeak } from '../utils/mathspeak';
import { playText } from '../utils/sonification';
import { Volume2, Trophy, RotateCcw, Brain, CheckCircle } from 'lucide-react';

interface Soal {
    id: number;
    pertanyaan: string;
    jawaban_benar: string;
    opsi_a: string;
    opsi_b: string;
    opsi_c: string;
    opsi_d: string;
}

export default function Latihan() {
    const [soalList, setSoalList] = useState<Soal[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const demoSoal = [
            { id: 1, pertanyaan: 'Berapakah nilai dari 1/2?', jawaban_benar: '0.5', opsi_a: '0.25', opsi_b: '0.5', opsi_c: '0.75', opsi_d: '1' },
            { id: 2, pertanyaan: 'Manakah yang merupakan pecahan senilai dengan 2/4?', jawaban_benar: '1/2', opsi_a: '1/3', opsi_b: '1/4', opsi_c: '1/2', opsi_d: '2/3' },
            { id: 3, pertanyaan: 'Hasil dari 1/4 + 1/4 adalah...', jawaban_benar: '1/2', opsi_a: '1/8', opsi_b: '2/8', opsi_c: '1/2', opsi_d: '1' }
        ];

        const apiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:8787';
        fetch(`${apiUrl}/soal`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setSoalList(data);
                } else {
                    setSoalList(demoSoal);
                }
                setLoading(false);
            })
            .catch(_err => {
                setSoalList(demoSoal);
                setLoading(false);
            });
    }, []);

    const handleAnswer = (jawaban: string) => {
        const currentSoal = soalList[currentIdx];
        const isCorrect = jawaban === currentSoal.jawaban_benar;

        if (isCorrect) {
            setScore(score + 10);
            playText("Jawaban Benar! Kerja bagus.");
        } else {
            playText("Jawaban Salah. Tetap semangat.");
        }

        if (currentIdx < soalList.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setShowResult(true);
            playText(`Latihan selesai. Skor akhir kamu ${score + (isCorrect ? 10 : 0)} dari total ${soalList.length * 10}`);
        }
    };

    const playSoal = () => {
        if (!soalList[currentIdx]) return;
        const text = `Pertanyaan nomor ${currentIdx + 1}. ${toMathSpeak(soalList[currentIdx].pertanyaan)}`;
        playText(text);
    };

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (soalList.length === 0) return (
        <div className="min-h-screen bg-background flex items-center justify-center text-muted">
            Tidak ada soal tersedia saat ini.
        </div>
    );

    if (showResult) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="glass-panel max-w-lg w-full p-12 text-center border-t-4 border-t-primary rounded-xl shadow-xl">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30">
                        <Trophy size={40} className="text-primary" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-dark mb-2">Hasil Latihan</h2>
                    <p className="text-muted mb-8">Kamu telah menyelesaikan semua soal!</p>
                    <div className="text-6xl font-bold text-primary mb-8 font-mono">
                        {score}
                        <span className="text-2xl text-muted ml-2">pts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-background p-4 border border-muted/20 rounded-xl">
                            <span className="text-xs text-muted uppercase tracking-widest block mb-1">Benar</span>
                            <span className="text-xl font-bold text-green-600 font-mono">{score / 10}</span>
                        </div>
                        <div className="bg-background p-4 border border-muted/20 rounded-xl">
                            <span className="text-xs text-muted uppercase tracking-widest block mb-1">Salah</span>
                            <span className="text-xl font-bold text-red-500 font-mono">{soalList.length - (score / 10)}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-primary text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Coba Lagi
                    </button>
                    <div className="mt-6 flex justify-center">
                        <a href="/belajar" className="text-muted hover:text-primary text-xs uppercase tracking-widest border-b border-transparent hover:border-primary transition-all">
                            Kembali ke Materi
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const currentSoal = soalList[currentIdx];
    const options = [
        { label: 'A', value: currentSoal.opsi_a },
        { label: 'B', value: currentSoal.opsi_b },
        { label: 'C', value: currentSoal.opsi_c },
        { label: 'D', value: currentSoal.opsi_d },
    ];

    return (
        <div className="min-h-screen bg-background py-16 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-end mb-8 border-b border-muted/20 pb-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary text-[10px] font-mono font-bold mb-2 uppercase tracking-widest rounded-full">
                            <Brain size={12} />
                            Latihan Soal
                        </div>
                        <h2 className="text-3xl font-display font-bold text-dark">Soal {currentIdx + 1} <span className="text-muted text-xl">/ {soalList.length}</span></h2>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-muted uppercase tracking-widest block mb-1">Skor Kamu</span>
                        <div className="text-2xl font-bold text-primary font-mono">{score}</div>
                    </div>
                </div>

                <div className="glass-panel p-8 md:p-12 mb-8 rounded-xl">
                    <div className="flex justify-between items-start gap-4 mb-8">
                        <p className="text-2xl md:text-3xl font-medium text-dark leading-relaxed">{currentSoal.pertanyaan}</p>
                        <button
                            onClick={playSoal}
                            className="p-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all rounded-lg group shrink-0"
                            aria-label="Bacakan Soal"
                        >
                            <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {options.map((opt: { label: string, value: string }) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className="relative p-6 text-left border border-muted/20 bg-background hover:bg-primary/10 hover:border-primary transition-all group overflow-hidden rounded-xl"
                                onFocus={() => playText(`Pilihan ${opt.label}. ${toMathSpeak(opt.value)}`)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono font-bold text-muted text-lg group-hover:text-primary transition-colors">{opt.label}</span>
                                        <span className="text-xl text-dark group-hover:text-dark transition-colors">{opt.value}</span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CheckCircle size={20} className="text-primary" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-muted/10 flex justify-between items-center">
                        <p className="text-xs text-muted font-mono">Tekan TAB untuk navigasi suara</p>
                        <div className="flex gap-1">
                            {soalList.map((_: Soal, idx: number) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 w-8 rounded-full ${idx === currentIdx ? 'bg-primary' : idx < currentIdx ? 'bg-primary/40' : 'bg-muted/20'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
