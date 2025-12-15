import { Link } from 'react-router-dom';
import { BookOpen, Volume2, Accessibility, Award, Headphones, GraduationCap } from 'lucide-react';
import MathRenderer from '../components/MathRenderer';
import { useState } from 'react';
import { toMathSpeak } from '../utils/mathspeak';
import { playText } from '../utils/sonification';

export default function Home() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayDemo = () => {
        setIsPlaying(true);
        const text = toMathSpeak("3/4");
        playText(text);
        setTimeout(() => setIsPlaying(false), 3000);
    };

    return (
        <div className="bg-obsidian min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-cyber-grid opacity-20 z-0"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-electric/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-neon/10 blur-[100px] rounded-full"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block px-4 py-1 border border-electric text-electric text-xs font-mono mb-6 tracking-widest uppercase bg-electric/5">
                                Prototype Skripsi 2025
                            </div>

                            <h1 className="text-display md:text-display-lg text-white mb-6 uppercase">
                                BISMA
                            </h1>

                            <p className="text-2xl md:text-3xl font-light text-ash-light mb-8 font-sans">
                                Bahasa Instruksi <span className="text-electric font-bold">Simbol Matematika</span> Audio
                            </p>

                            <p className="text-lg text-ash mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-2 border-white/10 pl-6">
                                Platform standardisasi cara membaca simbol matematika untuk pembelajar tunanetra.
                                Membuka akses pendidikan yang lebih inklusif dan presisi.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/rules"
                                    className="btn-primary flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                                >
                                    <BookOpen size={20} />
                                    Mulai Belajar
                                </Link>

                                <a
                                    href="#features"
                                    className="btn-outline flex items-center justify-center gap-3"
                                >
                                    Pelajari Lebih Lanjut
                                </a>
                            </div>
                        </div>

                        {/* Interactive Demo Card */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-electric to-neon opacity-30 blur group-hover:opacity-60 transition duration-1000"></div>
                                <div className="glass-panel relative p-8 md:p-10">
                                    <div className="text-center mb-8">
                                        <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-electric text-xs font-bold font-mono tracking-widest mb-4 uppercase">
                                            Demo Interaktif
                                        </span>
                                        <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">Coba Sekarang</h3>
                                        <p className="text-ash text-sm">Klik tombol di bawah untuk mendengar</p>
                                    </div>

                                    <div className="bg-obsidian border border-white/5 p-12 mb-8 flex items-center justify-center min-h-[200px] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
                                        <MathRenderer
                                            expression="3/4"
                                            className="text-8xl text-electric font-bold relative z-10 drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                                        />
                                    </div>

                                    <button
                                        onClick={handlePlayDemo}
                                        disabled={isPlaying}
                                        className={`w-full py-4 text-sm font-bold tracking-widest uppercase border transition-all flex items-center justify-center gap-3 ${isPlaying
                                            ? 'bg-electric text-obsidian border-electric cursor-wait'
                                            : 'bg-transparent text-electric border-electric hover:bg-electric hover:text-obsidian'
                                            }`}
                                    >
                                        <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
                                        {isPlaying ? 'Memutar Audio...' : 'Dengarkan "3/4"'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 bg-obsidian-light relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="container mx-auto">
                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h2 className="text-4xl font-display font-bold text-white mb-6 uppercase tracking-wide">Fitur Unggulan</h2>
                        <p className="text-lg text-ash leading-relaxed">
                            Dirancang dengan fokus pada <span className="text-electric">aksesibilitas</span>, <span className="text-neon">konsistensi</span>, dan kemudahan pembelajaran.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Accessibility,
                                title: "Aksesibilitas Penuh",
                                desc: "Kompatibel dengan screen reader, navigasi keyboard, dan standar WCAG AA/AAA.",
                                color: "text-electric"
                            },
                            {
                                icon: Volume2,
                                title: "Audio Interaktif",
                                desc: "Setiap simbol matematika dapat didengarkan dengan pengucapan standar yang konsisten.",
                                color: "text-neon"
                            },
                            {
                                icon: Award,
                                title: "Standar Nasional",
                                desc: "Adaptasi MathSpeak internasional ke Bahasa Indonesia berbasis riset akademik.",
                                color: "text-electric"
                            },
                            {
                                icon: Headphones,
                                title: "Pembelajaran Mandiri",
                                desc: "Siswa dapat belajar secara mandiri dengan panduan audio yang jelas dan terstruktur.",
                                color: "text-neon"
                            },
                            {
                                icon: GraduationCap,
                                title: "Berbasis Penelitian",
                                desc: "Dikembangkan sebagai output skripsi Pendidikan Matematika FPMIPA UPI.",
                                color: "text-electric"
                            },
                            {
                                icon: BookOpen,
                                title: "Fokus Pecahan",
                                desc: "Materi khusus pecahan dengan berbagai tingkat kompleksitas dari dasar hingga lanjut.",
                                color: "text-neon"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="glass-panel p-8 hover:bg-white/5 transition-all group border-t-2 border-t-transparent hover:border-t-electric"
                            >
                                <div className={`w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wide group-hover:text-electric transition-colors">{feature.title}</h3>
                                <p className="text-ash text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-4 bg-obsidian relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30"></div>
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="border border-white/10 bg-obsidian-light/50 backdrop-blur-sm p-10 md:p-16 relative">
                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric"></div>

                        <h2 className="text-3xl font-display font-bold text-white mb-8 text-center uppercase">Mengapa BISMA Penting?</h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-lg text-ash leading-relaxed mb-6">
                                    Siswa tunanetra sering menghadapi <strong className="text-white">ambiguitas instruksi verbal</strong> dalam pembelajaran matematika.
                                    Tanpa standar baku, satu simbol bisa dibaca dengan berbagai cara yang berbeda.
                                </p>
                                <Link
                                    to="/developer"
                                    className="inline-flex items-center gap-2 text-electric font-bold font-mono text-sm hover:translate-x-2 transition-transform uppercase tracking-widest mt-4"
                                >
                                    Tentang Pengembang →
                                </Link>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-red-900/10 border-l-4 border-red-500 p-6">
                                    <p className="text-red-400 font-bold font-mono text-xs uppercase mb-2">Masalah</p>
                                    <p className="text-ash">
                                        Pecahan <code className="bg-white/10 px-2 py-1 mx-1 text-white border border-white/20">1/2</code> dibaca "satu bagi dua", "setengah", atau "satu per dua"?
                                    </p>
                                </div>

                                <div className="bg-electric/5 border-l-4 border-electric p-6">
                                    <p className="text-electric font-bold font-mono text-xs uppercase mb-2">Solusi BISMA</p>
                                    <p className="text-white">
                                        Standarisasi: <strong>"Mulai Pecahan satu Per dua Selesai Pecahan"</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
