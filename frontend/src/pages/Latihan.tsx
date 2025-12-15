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
        // Fallback data
        const demoSoal = [
            { id: 1, pertanyaan: 'Berapakah nilai dari 1/2?', jawaban_benar: '0.5', opsi_a: '0.25', opsi_b: '0.5', opsi_c: '0.75', opsi_d: '1' },
            { id: 2, pertanyaan: 'Manakah yang merupakan pecahan senilai dengan 2/4?', jawaban_benar: '1/2', opsi_a: '1/3', opsi_b: '1/4', opsi_c: '1/2', opsi_d: '2/3' },
            { id: 3, pertanyaan: 'Hasil dari 1/4 + 1/4 adalah...', jawaban_benar: '1/2', opsi_a: '1/8', opsi_b: '2/8', opsi_c: '1/2', opsi_d: '1' }
        ];

        fetch('http://localhost:8787/soal')
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
        <div className="min-h-screen bg-obsidian flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric"></div>
        </div>
    );

    if (soalList.length === 0) return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-ash">
            Tidak ada soal tersedia saat ini.
        </div>
    );

    if (showResult) {
        return (
            <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
                <div className="glass-panel max-w-lg w-full p-12 text-center border-t-4 border-t-electric relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon/10 blur-[40px] rounded-full"></div>

                    <div className="w-20 h-20 bg-electric/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-electric/30">
                        <Trophy size={40} className="text-electric" />
                    </div>

                    <h2 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-wide">Hasil Latihan</h2>
                    <p className="text-ash mb-8">Kamu telah menyelesaikan semua soal!</p>

                    <div className="text-6xl font-bold text-electric mb-8 font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">
                        {score}
                        <span className="text-2xl text-ash/50 ml-2">pts</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 p-4 border border-white/10">
                            <span className="text-xs text-ash uppercase tracking-widest block mb-1">Benar</span>
                            <span className="text-xl font-bold text-green-400 font-mono">{score / 10}</span>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/10">
                            <span className="text-xs text-ash uppercase tracking-widest block mb-1">Salah</span>
                            <span className="text-xl font-bold text-red-400 font-mono">{soalList.length - (score / 10)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-electric text-obsidian px-6 py-4 rounded-none font-bold hover:bg-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Coba Lagi
                    </button>

                    <div className="mt-6 flex justify-center">
                        <a href="/belajar" className="text-ash hover:text-white text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-0.5">
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
        <div className="min-h-screen bg-obsidian py-16 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon/10 border border-neon/30 text-neon text-[10px] font-mono font-bold mb-2 uppercase tracking-widest">
                            <Brain size={12} />
                            Latihan Soal
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Soal {currentIdx + 1} <span className="text-ash/50 text-xl">/ {soalList.length}</span></h2>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-ash uppercase tracking-widest block mb-1">Skor Kamu</span>
                        <div className="text-2xl font-bold text-electric font-mono">{score}</div>
                    </div>
                </div>

                <div className="glass-panel p-8 md:p-12 mb-8 relative">
                    <div className="flex justify-between items-start gap-4 mb-8">
                        <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">{currentSoal.pertanyaan}</p>
                        <button
                            onClick={playSoal}
                            className="p-3 bg-white/5 text-electric border border-white/10 hover:border-electric hover:bg-electric hover:text-obsidian transition-all group shrink-0"
                            aria-label="Bacakan Soal"
                        >
                            <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {options.map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleAnswer(opt.value)}
                                className="relative p-6 text-left border border-white/10 bg-white/5 hover:bg-electric/10 hover:border-electric transition-all group overflow-hidden"
                                onFocus={() => playText(`Pilihan ${opt.label}. ${toMathSpeak(opt.value)}`)}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-electric transition-colors"></div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono font-bold text-ash/50 text-lg group-hover:text-electric transition-colors">{opt.label}</span>
                                        <span className="text-xl text-ash-light group-hover:text-white transition-colors">{opt.value}</span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                        <CheckCircle size={20} className="text-electric" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                        <p className="text-xs text-ash font-mono">Tekan TAB untuk navigasi suara</p>
                        <div className="flex gap-1">
                            {soalList.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 w-8 ${idx === currentIdx ? 'bg-electric' : idx < currentIdx ? 'bg-electric/50' : 'bg-white/10'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
