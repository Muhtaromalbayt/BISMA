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
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="absolute inset-0 opacity-10"
                    style={{backgroundImage:'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize:'30px 30px'}}
                ></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block px-4 py-1 border border-white/30 text-white/80 text-xs font-mono mb-6 tracking-widest uppercase bg-white/10 rounded-full">
                                Brainstorming Adaptasi MathSpeak – Indonesia
                            </div>

                            <h1 className="text-display md:text-display-lg text-white mb-6">
                                BISMA
                            </h1>

                            <p className="text-2xl md:text-3xl font-light text-white/80 mb-8 font-sans">
                                Bahasa Instruksi <span className="text-white font-bold">Simbol Matematika</span> Audio
                            </p>

                            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-4 border-white/30 pl-6">
                                Menjajaki apakah standar MathSpeak internasional cocok diadaptasi ke Bahasa Indonesia
                                untuk mendukung pembelajaran matematika bagi siswa tunanetra.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/rules"
                                    className="bg-white text-primary font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3"
                                >
                                    <BookOpen size={20} />
                                    Mulai Belajar
                                </Link>

                                <a
                                    href="#features"
                                    className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg uppercase tracking-wider hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-3"
                                >
                                    Pelajari Lebih Lanjut
                                </a>
                            </div>
                        </div>

                        {/* Interactive Demo Card */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-md">
                                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                                    <div className="text-center mb-8">
                                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold font-mono tracking-widest mb-4 uppercase rounded-full">
                                            Demo Interaktif
                                        </span>
                                        <h3 className="text-2xl font-display font-bold text-dark mb-2">COBA SEKARANG</h3>
                                        <p className="text-muted text-sm">Klik tombol di bawah untuk mendengar</p>
                                    </div>

                                    <div className="bg-background border border-primary/10 p-12 mb-8 flex items-center justify-center min-h-[200px] rounded-xl">
                                        <MathRenderer
                                            expression="3/4"
                                            className="text-8xl text-primary font-bold"
                                        />
                                    </div>

                                    <button
                                        onClick={handlePlayDemo}
                                        disabled={isPlaying}
                                        className={`w-full py-4 text-sm font-bold tracking-widest uppercase rounded-lg border-2 transition-all flex items-center justify-center gap-3 ${isPlaying
                                            ? 'bg-primary text-white border-primary cursor-wait'
                                            : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white'
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
            <section id="features" className="py-24 px-4 bg-white relative">
                <div className="container mx-auto">
                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h2 className="text-4xl font-display font-bold text-dark mb-6">Fitur Unggulan</h2>
                        <p className="text-lg text-muted leading-relaxed">
                            Dirancang dengan fokus pada <span className="text-primary font-semibold">aksesibilitas</span>, <span className="text-secondary font-semibold">konsistensi</span>, dan kemudahan pembelajaran.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Accessibility,
                                title: "Aksesibilitas Penuh",
                                desc: "Kompatibel dengan screen reader, navigasi keyboard, dan standar WCAG AA/AAA.",
                                color: "text-primary"
                            },
                            {
                                icon: Volume2,
                                title: "Audio Interaktif",
                                desc: "Setiap simbol matematika dapat didengarkan dengan pengucapan standar yang konsisten.",
                                color: "text-secondary"
                            },
                            {
                                icon: Award,
                                title: "Standar Nasional",
                                desc: "Adaptasi MathSpeak internasional ke Bahasa Indonesia berbasis riset akademik.",
                                color: "text-primary"
                            },
                            {
                                icon: Headphones,
                                title: "Pembelajaran Mandiri",
                                desc: "Siswa dapat belajar secara mandiri dengan panduan audio yang jelas dan terstruktur.",
                                color: "text-secondary"
                            },
                            {
                                icon: GraduationCap,
                                title: "Berbasis Riset",
                                desc: "Menjajaki adaptasi standar MathSpeak internasional ke dalam Bahasa Indonesia melalui brainstorming akademik.",
                                color: "text-primary"
                            },
                            {
                                icon: BookOpen,
                                title: "Fokus Pecahan",
                                desc: "Materi khusus pecahan dengan berbagai tingkat kompleksitas dari dasar hingga lanjut.",
                                color: "text-secondary"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-background border border-primary/10 p-8 rounded-xl hover:shadow-md hover:border-primary/30 transition-all group"
                            >
                                <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-display font-bold text-dark mb-4">{feature.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-4 bg-background relative overflow-hidden">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="border border-primary/10 bg-white rounded-2xl p-10 md:p-16 shadow-sm">
                        <h2 className="text-3xl font-display font-bold text-dark mb-8 text-center">Mengapa BISMA Penting?</h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-lg text-muted leading-relaxed mb-6">
                                    Siswa tunanetra sering menghadapi <strong className="text-dark">ambiguitas instruksi verbal</strong> dalam pembelajaran matematika.
                                    Tanpa standar baku, satu simbol bisa dibaca dengan berbagai cara yang berbeda.
                                </p>
                                <Link
                                    to="/developer"
                                    className="inline-flex items-center gap-2 text-primary font-bold font-mono text-sm hover:translate-x-2 transition-transform uppercase tracking-widest mt-4"
                                >
                                    Tentang Pengembang →
                                </Link>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                                    <p className="text-red-600 font-bold font-mono text-xs uppercase mb-2">Masalah</p>
                                    <p className="text-muted">
                                        Pecahan <code className="bg-red-100 px-2 py-1 mx-1 text-dark border border-red-200 rounded">1/2</code> dibaca "satu bagi dua", "setengah", atau "satu per dua"?
                                    </p>
                                </div>

                                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                                    <p className="text-primary font-bold font-mono text-xs uppercase mb-2">Solusi BISMA</p>
                                    <p className="text-dark">
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
