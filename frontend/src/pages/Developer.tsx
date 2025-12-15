import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, Globe, Server, Award, Book, Heart, Users } from 'lucide-react';
import developerPhoto from '../assets/developer-photo.jpg';

export default function Developer() {
    return (
        <div className="font-sans text-ash bg-obsidian min-h-screen pb-20">
            {/* Header Profile */}
            <header className="relative py-24 px-4 overflow-hidden border-b border-white/10">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-cyber-grid opacity-20 z-0"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-electric/10 blur-[100px] rounded-full"></div>

                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric/10 border border-electric/30 text-electric text-xs font-mono font-bold mb-6 uppercase tracking-widest">
                        <Award size={14} />
                        Pengembang BISMA
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase tracking-wide">Tentang Pengembang</h1>
                    <p className="text-xl text-ash-light font-light">Profil Akademik & Latar Belakang Penelitian</p>
                </div>
            </header>

            <main className="container mx-auto px-4 -mt-20 relative z-10 pb-16">
                {/* Profile Card */}
                <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto mb-16 relative overflow-visible">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative flex-shrink-0 group">
                            {/* Developer Photo */}
                            <div className="w-48 h-48 rounded-none overflow-hidden border-2 border-white/10 shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={developerPhoto}
                                    alt="Muhtarom Nur Rasyid - Pengembang BISMA"
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: 'center 15%' }}
                                />
                            </div>
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-electric/30 z-0 scale-90 group-hover:scale-100 transition-transform duration-500"></div>

                            {/* Award Badge */}
                            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-electric text-obsidian flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.5)] z-20">
                                <Award size={20} />
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 uppercase tracking-wide">Muhtarom Nur Rasyid</h2>
                            <p className="text-electric font-mono text-sm uppercase tracking-widest mb-8 border-b border-white/10 pb-4 inline-block">Mahasiswa Pendidikan Matematika – FPMIPA UPI</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                <div className="bg-white/5 p-5 border border-white/10 hover:border-neon transition-colors group">
                                    <p className="text-[10px] text-neon uppercase tracking-widest font-mono font-bold mb-2">Fokus Penelitian</p>
                                    <p className="font-bold text-white text-lg group-hover:text-neon transition-colors">Aksesibilitas Matematika</p>
                                </div>
                                <div className="bg-white/5 p-5 border border-white/10 hover:border-electric transition-colors group">
                                    <p className="text-[10px] text-electric uppercase tracking-widest font-mono font-bold mb-2">Tahun Pengembangan</p>
                                    <p className="font-bold text-white text-lg group-hover:text-electric transition-colors">2025 (Skripsi)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Philosophy & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                    <section className="bg-obsidian p-8 border border-white/10 hover:border-electric transition-all relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/5 text-electric border border-white/10">
                                <Heart size={20} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Filosofi</h3>
                        </div>
                        <p className="text-white text-lg leading-relaxed mb-4 italic font-light border-l-2 border-electric pl-4">
                            "Matematika adalah hak semua siswa. Hambatan visual tidak boleh membatasi pemahaman konsep."
                        </p>
                        <p className="text-ash text-sm leading-relaxed font-mono">
                            BISMA dikembangkan untuk memastikan kesetaraan akses pendidikan melalui standardisasi instruksi audio yang presisi.
                        </p>
                    </section>

                    <section className="bg-obsidian p-8 border border-white/10 hover:border-neon transition-all relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/5 text-neon border border-white/10">
                                <Book size={20} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Konteks Akademik</h3>
                        </div>
                        <p className="text-ash text-sm leading-relaxed mb-4 font-mono">
                            <strong className="text-white uppercase text-xs tracking-widest block mb-2">Judul Skripsi:</strong>
                            "Pengembangan Standarisasi Bahasa Instruksi Simbol Matematika Audio (BISMA) untuk Pembelajar Tunanetra Pada Topik Pecahan"
                        </p>
                    </section>
                </div>

                {/* Supervisors Section */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-ash text-xs font-mono font-bold mb-4 uppercase tracking-widest">
                            <Users size={14} />
                            Tim Pembimbing
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wide">Dosen Pembimbing</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pembimbing 1 */}
                        <div className="glass-panel p-8 hover:bg-white/5 transition-all group">
                            <div className="flex items-start gap-5">
                                <div className="p-4 bg-obsidian border border-electric/30 text-electric flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-electric uppercase tracking-widest font-mono font-bold mb-2">Pembimbing I</p>
                                    <h4 className="text-xl font-bold text-white mb-3">Dr. [Nama Dosen], M.Pd.</h4>
                                    <p className="text-ash text-xs font-mono leading-relaxed">
                                        Dosen Pendidikan Matematika<br />
                                        Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam<br />
                                        Universitas Pendidikan Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pembimbing 2 */}
                        <div className="glass-panel p-8 hover:bg-white/5 transition-all group">
                            <div className="flex items-start gap-5">
                                <div className="p-4 bg-obsidian border border-neon/30 text-neon flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-neon uppercase tracking-widest font-mono font-bold mb-2">Pembimbing II</p>
                                    <h4 className="text-xl font-bold text-white mb-3">Dr. [Nama Dosen], M.Pd.</h4>
                                    <p className="text-ash text-xs font-mono leading-relaxed">
                                        Dosen Pendidikan Matematika<br />
                                        Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam<br />
                                        Universitas Pendidikan Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <section className="max-w-5xl mx-auto">
                    <h3 className="text-center text-2xl font-display font-bold text-white mb-8 uppercase tracking-widest">Teknologi Pengembangan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Globe, label: "React + Vite", desc: "Frontend", color: "text-electric border-electric/30 bg-electric/5" },
                            { icon: Server, label: "Cloudflare Workers", desc: "Backend", color: "text-neon border-neon/30 bg-neon/5" },
                            { icon: Database, label: "Cloudflare D1", desc: "Database", color: "text-electric border-electric/30 bg-electric/5" },
                            { icon: Code, label: "TypeScript", desc: "Language", color: "text-neon border-neon/30 bg-neon/5" }
                        ].map((tech, idx) => (
                            <div key={idx} className={`p-6 border ${tech.color} flex flex-col items-center justify-center hover:bg-white/5 transition-all group`}>
                                <tech.icon className="mb-4 group-hover:scale-110 transition-transform" size={28} />
                                <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">{tech.label}</h4>
                                <p className="text-[10px] text-ash font-mono uppercase tracking-widest">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="text-center mt-16 pb-8 border-t border-white/5 pt-8 container mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-ash hover:text-electric font-bold transition-colors uppercase tracking-widest text-xs font-mono"
                >
                    <ArrowLeft size={14} />
                    Kembali ke Beranda
                </Link>
            </footer>
        </div>
    );
}
