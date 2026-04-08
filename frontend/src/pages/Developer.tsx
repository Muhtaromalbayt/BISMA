import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, Globe, Server, Award, Heart, Users, Lightbulb } from 'lucide-react';
import developerPhoto from '../assets/developer-photo.jpg';

export default function Developer() {
    return (
        <div className="font-sans text-dark bg-background min-h-screen pb-20">
            {/* Header Profile */}
            <header className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                ></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white/90 text-xs font-mono font-bold mb-6 uppercase tracking-widest rounded-full">
                        <Award size={14} />
                        Pengembang BISMA
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Tentang Pengembang</h1>
                    <p className="text-xl text-white/80 font-light">Profil & Latar Belakang Riset</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                {/* Profile Card */}
                <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto mb-12 rounded-2xl shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative flex-shrink-0">
                            {/* Developer Photo */}
                            <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                                <img
                                    src={developerPhoto}
                                    alt="Muhtarom Nur Rasyid - Pengembang BISMA"
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: 'center 15%' }}
                                />
                            </div>
                            {/* Award Badge */}
                            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                                <Award size={20} />
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">Muhtarom Nur Rasyid</h2>
                            <p className="text-primary font-mono text-sm uppercase tracking-widest mb-6 inline-block border-b-2 border-primary/30 pb-2">
                                Mahasiswa Pendidikan Matematika – FPMIPA UPI
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                <div className="bg-background p-5 border border-primary/10 hover:border-secondary rounded-xl transition-colors group">
                                    <p className="text-[10px] text-secondary uppercase tracking-widest font-mono font-bold mb-2">Fokus Penelitian</p>
                                    <p className="font-bold text-dark text-lg group-hover:text-secondary transition-colors">Aksesibilitas Matematika</p>
                                </div>
                                <div className="bg-background p-5 border border-primary/10 hover:border-primary rounded-xl transition-colors group">
                                    <p className="text-[10px] text-primary uppercase tracking-widest font-mono font-bold mb-2">Tahun Pengembangan</p>
                                    <p className="font-bold text-dark text-lg group-hover:text-primary transition-colors">2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Philosophy & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
                    <section className="bg-white p-8 border border-primary/10 hover:border-primary rounded-2xl transition-all group shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <Heart size={20} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-dark">Filosofi</h3>
                        </div>
                        <p className="text-dark text-lg leading-relaxed mb-4 italic font-light border-l-4 border-primary pl-4">
                            "Matematika adalah hak semua siswa. Hambatan visual tidak boleh membatasi pemahaman konsep."
                        </p>
                        <p className="text-muted text-sm leading-relaxed">
                            BISMA dirancang untuk memastikan kesetaraan akses pendidikan melalui standardisasi instruksi audio yang presisi dan konsisten.
                        </p>
                    </section>

                    <section className="bg-white p-8 border border-secondary/20 hover:border-secondary rounded-2xl transition-all group shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                                <Lightbulb size={20} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-dark">Konteks Riset</h3>
                        </div>
                        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 mb-3">
                            <p className="text-[10px] text-secondary uppercase tracking-widest font-mono font-bold mb-2">Topik Brainstorming</p>
                            <p className="text-dark text-sm leading-relaxed">
                                Menjajaki apakah standar MathSpeak internasional dapat diadaptasi secara efektif ke dalam Bahasa Indonesia untuk pembelajaran tunanetra.
                            </p>
                        </div>
                        <p className="text-muted text-xs font-mono">
                            Program Studi Pendidikan Matematika, FPMIPA — Universitas Pendidikan Indonesia
                        </p>
                    </section>
                </div>

                {/* Supervisors Section */}
                <div className="max-w-5xl mx-auto mb-12">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold mb-4 uppercase tracking-widest rounded-full">
                            <Users size={14} />
                            Tim Pembimbing
                        </div>
                        <h3 className="text-3xl font-display font-bold text-dark">Dosen Pembimbing</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Pembimbing I', color: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/10' },
                            { label: 'Pembimbing II', color: 'text-secondary', border: 'border-secondary/20', bg: 'bg-secondary/10' },
                        ].map((p) => (
                            <div key={p.label} className="glass-panel p-8 hover:shadow-md transition-all rounded-2xl">
                                <div className="flex items-start gap-5">
                                    <div className={`p-4 ${p.bg} ${p.color} rounded-xl flex-shrink-0`}>
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className={`text-[10px] ${p.color} uppercase tracking-widest font-mono font-bold mb-2`}>{p.label}</p>
                                        <h4 className="text-xl font-bold text-dark mb-3">Dr. [Nama Dosen], M.Pd.</h4>
                                        <p className="text-muted text-xs font-mono leading-relaxed">
                                            Dosen Pendidikan Matematika<br />
                                            Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam<br />
                                            Universitas Pendidikan Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <section className="max-w-5xl mx-auto">
                    <h3 className="text-center text-2xl font-display font-bold text-dark mb-8">Teknologi Pengembangan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Globe, label: "React + Vite", desc: "Frontend", colorClass: "text-primary bg-primary/5 border-primary/20" },
                            { icon: Server, label: "Cloudflare Workers", desc: "Backend", colorClass: "text-secondary bg-secondary/5 border-secondary/20" },
                            { icon: Database, label: "Cloudflare D1", desc: "Database", colorClass: "text-primary bg-primary/5 border-primary/20" },
                            { icon: Code, label: "TypeScript", desc: "Language", colorClass: "text-secondary bg-secondary/5 border-secondary/20" }
                        ].map((tech, idx) => (
                            <div key={idx} className={`p-6 border rounded-xl flex flex-col items-center justify-center hover:shadow-md transition-all group ${tech.colorClass}`}>
                                <tech.icon className="mb-4 group-hover:scale-110 transition-transform" size={28} />
                                <h4 className="font-bold text-dark mb-1 text-sm tracking-wide text-center">{tech.label}</h4>
                                <p className="text-[10px] text-muted font-mono uppercase tracking-widest">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="text-center mt-16 pb-8 border-t border-muted/20 pt-8 container mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted hover:text-primary font-bold transition-colors text-xs font-mono"
                >
                    <ArrowLeft size={14} />
                    Kembali ke Beranda
                </Link>
            </footer>
        </div>
    );
}
