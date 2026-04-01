import { useEffect, useState } from 'react';
import { toMathSpeak } from '../utils/mathspeak';
import { playText } from '../utils/sonification';
import { Play, BookOpen, ChevronRight, Hash } from 'lucide-react';

interface Materi {
    id: number;
    judul: string;
    konten: string;
    urutan: number;
}

export default function Belajar() {
    const [materiList, setMateriList] = useState<Materi[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMateri, setActiveMateri] = useState<Materi | null>(null);

    useEffect(() => {
        // Fallback data since backend might not be running
        const demoData = [
            { id: 1, judul: 'Pengenalan Pecahan', konten: 'Pecahan adalah bagian dari keseluruhan. Contoh: 1/2 artinya satu bagian dari dua bagian yang sama.', urutan: 1 },
            { id: 2, judul: 'Penjumlahan Pecahan', konten: 'Untuk menjumlahkan pecahan dengan penyebut sama, jumlahkan pembilangnya saja. Contoh: 1/4 + 2/4 = 3/4', urutan: 2 },
            { id: 3, judul: 'Pengurangan Pecahan', konten: 'Pengurangan pecahan serupa dengan penjumlahan. Pastikan penyebut sama, lalu kurangi pembilang. Contoh: 3/4 - 1/4 = 2/4 = 1/2', urutan: 3 },
            { id: 4, judul: 'Pecahan Campuran', konten: 'Pecahan campuran terdiri dari bilangan bulat dan pecahan biasa. Contoh: 1 1/2. Cara bacanya: "Satu, satu per dua".', urutan: 4 }
        ];

        // Try fetch but fall back quickly
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
        fetch(`${apiUrl}/materi`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setMateriList(data);
                    setActiveMateri(data[0]);
                } else {
                    setMateriList(demoData);
                    setActiveMateri(demoData[0]);
                }
                setLoading(false);
            })
            .catch(_err => {
                console.log("Using demo data");
                setMateriList(demoData);
                setActiveMateri(demoData[0]);
                setLoading(false);
            });
    }, []);

    const handlePlay = (text: string) => {
        const speakableText = toMathSpeak(text);
        playText(speakableText);
    };

    if (loading) return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-obsidian font-sans pb-20 pt-8 px-4">
            {/* Header */}
            <div className="container mx-auto mb-10 border-b border-white/10 pb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-electric/10 border border-electric/30 text-electric text-xs font-mono font-bold mb-4 uppercase tracking-widest">
                    <BookOpen size={14} />
                    Modul Pembelajaran
                </div>
                <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wide">Materi Belajar</h1>
                <p className="text-ash mt-2">Pelajari konsep matematika dengan panduan audio BISMA</p>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4">
                    <div className="glass-panel p-2 sticky top-24">
                        <div className="px-3 py-2 mb-2 border-b border-white/10">
                            <h3 className="text-xs font-bold text-ash/50 uppercase tracking-widest font-mono">Daftar Materi</h3>
                        </div>
                        <ul className="space-y-1">
                            {materiList.map((m) => (
                                <li key={m.id}>
                                    <button
                                        onClick={() => setActiveMateri(m)}
                                        className={`w-full text-left px-4 py-3 rounded-none transition-all font-bold flex items-center gap-3 uppercase tracking-wide text-xs ${activeMateri?.id === m.id
                                            ? 'bg-electric text-obsidian border-l-4 border-obsidian'
                                            : 'text-ash hover:bg-white/5 hover:text-white hover:border-l-4 hover:border-electric'
                                            }`}
                                        aria-current={activeMateri?.id === m.id ? 'true' : undefined}
                                    >
                                        <span className="opacity-50 font-mono">{(m.urutan || m.id).toString().padStart(2, '0')}</span>
                                        <span className="flex-1 truncate">{m.judul}</span>
                                        {activeMateri?.id === m.id && <ChevronRight size={14} />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="w-full md:w-3/4">
                    {activeMateri ? (
                        <div className="glass-panel p-8 min-h-[500px] relative overflow-hidden">
                            {/* Decorative bg */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 blur-[80px] rounded-full"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-6 relative z-10">
                                <div>
                                    <span className="text-electric font-mono text-xs uppercase tracking-widest mb-1 block">Materi {(activeMateri.urutan || activeMateri.id)}</span>
                                    <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide">{activeMateri.judul}</h2>
                                </div>
                                <button
                                    onClick={() => handlePlay(activeMateri.judul + ". " + activeMateri.konten)}
                                    className="mt-4 md:mt-0 flex items-center gap-2 bg-electric text-obsidian px-6 py-2 rounded-none font-bold hover:bg-white hover:text-obsidian transition-colors uppercase tracking-widest text-xs shadow-lg"
                                    aria-label="Bacakan Materi"
                                >
                                    <Play size={16} />
                                    <span>Dengar Materi</span>
                                </button>
                            </div>

                            <div className="prose prose-invert max-w-none mb-10 relative z-10">
                                <p className="text-lg text-ash-light leading-relaxed font-light">{activeMateri.konten}</p>
                            </div>

                            {/* MathSpeak Preview Box */}
                            <div className="bg-obsidian border border-white/10 p-6 relative group z-10">
                                <div className="absolute top-0 left-0 w-1 h-full bg-neon"></div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Hash size={16} className="text-neon" />
                                    <h4 className="font-bold text-white text-sm uppercase tracking-widest">MathSpeak Preview</h4>
                                </div>
                                <p className="font-mono text-ash text-sm italic border-l border-white/10 pl-4 py-2">
                                    "{toMathSpeak(activeMateri.konten)}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                            <BookOpen size={48} className="text-ash mb-4 opacity-20" />
                            <p className="text-ash text-lg">Pilih materi dari menu di samping untuk mulai belajar.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
