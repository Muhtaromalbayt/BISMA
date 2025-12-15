import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff, Terminal } from 'lucide-react';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simple authentication (in production, use proper backend authentication)
        setTimeout(() => {
            if (username === 'admin' && password === 'bisma2025') {
                // Store auth token in localStorage
                localStorage.setItem('bisma_admin_token', 'authenticated');
                localStorage.setItem('bisma_admin_user', username);
                navigate('/admin/dashboard');
            } else {
                setError('Akses Ditolak: Kredensial tidak valid');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/5 blur-[100px] rounded-full"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Login Card */}
                <div className="glass-panel p-8 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-electric/30 rounded-none mb-4 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-electric/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Shield size={40} className="text-electric relative z-10" />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-widest">Admin Access</h1>
                        <p className="text-ash font-mono text-xs uppercase tracking-wider">Control Panel Security Gateway</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/20 border-l-2 border-red-500 flex items-center gap-3">
                            <Terminal size={16} className="text-red-500" />
                            <p className="text-red-400 font-mono text-xs">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-[10px] font-bold text-electric mb-2 uppercase tracking-widest font-mono">
                                ID Pengguna
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ash group-focus-within:text-electric transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 focus:border-electric focus:bg-white/10 focus:outline-none transition-all text-white font-mono text-sm placeholder:text-ash/30"
                                    placeholder="MASUKKAN ID"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-[10px] font-bold text-electric mb-2 uppercase tracking-widest font-mono">
                                Kata Sandi
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ash group-focus-within:text-electric transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 focus:border-electric focus:bg-white/10 focus:outline-none transition-all text-white font-mono text-sm placeholder:text-ash/30"
                                    placeholder="ENKRIPSI DIPERLUKAN"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${isLoading
                                ? 'bg-ash/20 text-ash cursor-not-allowed'
                                : 'bg-electric text-obsidian hover:bg-white hover:text-obsidian shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                                }`}
                        >
                            {isLoading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Terminal size={16} />
                                    Oturisasi Masuk
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-ash hover:text-electric text-xs font-mono uppercase tracking-widest transition-colors border-b border-transparent hover:border-electric pb-1"
                    >
                        ← Batalkan & Kembali ke Terminal Utama
                    </button>
                </div>
            </div>
        </div>
    );
}
