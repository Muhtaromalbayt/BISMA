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
        const demoData = [
            { id: 1, judul: 'Pengenalan Pecahan', konten: 'Pecahan adalah bagian dari keseluruhan. Contoh: 1/2 artinya satu bagian dari dua bagian yang sama.', urutan: 1 },
            { id: 2, judul: 'Penjumlahan Pecahan', konten: 'Untuk menjumlahkan pecahan dengan penyebut sama, jumlahkan pembilangnya saja. Contoh: 1/4 + 2/4 = 3/4', urutan: 2 },
            { id: 3, judul: 'Pengurangan Pecahan', konten: 'Pengurangan pecahan serupa dengan penjumlahan. Pastikan penyebut sama, lalu kurangi pembilang. Contoh: 3/4 - 1/4 = 2/4 = 1/2', urutan: 3 },
            { id: 4, judul: 'Pecahan Campuran', konten: 'Pecahan campuran terdiri dari bilangan bulat dan pecahan biasa. Contoh: 1 1/2. Cara bacanya: "Satu, satu per dua".', urutan: 4 }
        ];

        const apiUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:8787';
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
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background font-sans pb-20 pt-8 px-4">
            {/* Header */}
            <div className="container mx-auto mb-10 border-b border-muted/20 pb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-4 uppercase tracking-widest rounded-full">
                    <BookOpen size={14} />
                    Modul Pembelajaran
                </div>
                <h1 className="text-4xl font-display font-bold text-dark">Materi Belajar</h1>
                <p className="text-muted mt-2">Pelajari konsep matematika dengan panduan audio BISMA</p>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4">
                    <div className="glass-panel p-2 sticky top-24 rounded-xl">
                        <div className="px-3 py-2 mb-2 border-b border-muted/20">
                            <h3 className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Daftar Materi</h3>
                        </div>
                        <ul className="space-y-1">
                            {materiList.map((m: Materi) => (
                                <li key={m.id}>
                                    <button
                                        onClick={() => setActiveMateri(m)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all font-bold flex items-center gap-3 text-xs ${activeMateri?.id === m.id
                                            ? 'bg-primary text-white'
                                            : 'text-muted hover:bg-primary/10 hover:text-primary'
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
                        <div className="glass-panel p-8 min-h-[500px] rounded-xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-muted/20 pb-6">
                                <div>
                                    <span className="text-primary font-mono text-xs uppercase tracking-widest mb-1 block">Materi {(activeMateri.urutan || activeMateri.id)}</span>
                                    <h2 className="text-3xl font-display font-bold text-dark">{activeMateri.judul}</h2>
                                </div>
                                <button
                                    onClick={() => handlePlay(activeMateri.judul + ". " + activeMateri.konten)}
                                    className="mt-4 md:mt-0 flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors text-xs shadow-md"
                                    aria-label="Bacakan Materi"
                                >
                                    <Play size={16} />
                                    <span>Dengar Materi</span>
                                </button>
                            </div>

                            <div className="prose max-w-none mb-10">
                                <p className="text-lg text-dark leading-relaxed font-light">{activeMateri.konten}</p>
                            </div>

                            {/* MathSpeak Preview Box */}
                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <Hash size={16} className="text-secondary" />
                                    <h4 className="font-bold text-dark text-sm uppercase tracking-widest">MathSpeak Preview</h4>
                                </div>
                                <p className="font-mono text-muted text-sm italic border-l-4 border-primary/30 pl-4 py-2">
                                    "{toMathSpeak(activeMateri.konten)}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center min-h-[400px] rounded-xl">
                            <BookOpen size={48} className="text-muted mb-4 opacity-20" />
                            <p className="text-muted text-lg">Pilih materi dari menu di samping untuk mulai belajar.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
