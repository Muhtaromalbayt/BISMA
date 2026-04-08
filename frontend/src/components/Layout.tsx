import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, User, ScanText, X, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Beranda', icon: Home },
        { path: '/reader', label: 'Pembaca', icon: ScanText },
        { path: '/rules', label: 'Aturan Baca', icon: BookOpen },
        { path: '/developer', label: 'Pengembang', icon: User },
        { path: '/admin', label: 'Admin', icon: Shield },
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen font-sans flex flex-col text-dark">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: UPI Logo + BISMA Logo */}
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* UPI Logo */}
                            <img
                                src="/upi-logo.jpg"
                                alt="Logo UPI"
                                className="h-10 md:h-12 w-auto object-contain"
                            />

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-10 md:h-12 bg-primary/20"></div>

                            {/* BISMA Logo */}
                            <Link
                                to="/"
                                className="flex items-center gap-2 group"
                                onClick={closeMobileMenu}
                            >
                                <img
                                    src="/bisma-logo.png"
                                    alt="Logo BISMA"
                                    className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all rounded-lg relative ${location.pathname === item.path
                                        ? 'text-primary bg-primary/10 font-semibold'
                                        : 'text-muted hover:text-primary hover:bg-primary/5'
                                        }`}
                                >
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-3 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50 md:hidden"
                    onClick={closeMobileMenu}
                >
                    {/* Mobile Menu Panel */}
                    <div
                        className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white border-l border-primary/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-6 border-b border-primary/10">
                            <h2 className="text-xl font-display font-bold text-dark tracking-wide">MENU</h2>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 text-muted hover:text-primary transition-colors rounded-lg"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <nav className="p-6">
                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={closeMobileMenu}
                                            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-medium ${location.pathname === item.path
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : 'text-muted hover:text-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            <item.icon size={20} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile Menu Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary/10 bg-background">
                            <p className="text-xs text-muted text-center uppercase tracking-widest">
                                BISMA v1.0
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow relative z-0">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-dark text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <h3 className="text-3xl font-display font-bold mb-4">BISMA</h3>
                            <p className="text-muted-light leading-relaxed max-w-xs border-l-2 border-primary pl-4">
                                Brainstorming Adaptasi MathSpeak
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Navigasi</h4>
                            <ul className="space-y-3">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="text-muted-light hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Academic Info */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Info Akademik</h4>
                            <ul className="space-y-3 text-muted-light">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 border border-primary rounded-full"></span>
                                    Brainstorming Akademik 2025
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 border border-primary rounded-full"></span>
                                    Pendidikan Matematika FPMIPA UPI
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 border border-primary rounded-full"></span>
                                    Muhtarom Nur Rasyid
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center text-muted-light text-sm flex flex-col items-center gap-2">
                        <p>&copy; 2025 BISMA Project.</p>
                        <p className="text-xs text-muted-light/50">Dikembangkan dengan ❤️ untuk Aksesibilitas Indonesia.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
