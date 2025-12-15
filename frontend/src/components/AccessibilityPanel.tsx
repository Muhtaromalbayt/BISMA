import { useState, useEffect } from 'react';
import { Settings, X, Type, Contrast, ZoomIn, ZoomOut } from 'lucide-react';

export default function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [largeSpacing, setLargeSpacing] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        // Apply font size
        root.style.fontSize = `${fontSize}%`;

        // Apply high contrast mode
        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        // Apply large spacing
        if (largeSpacing) {
            root.classList.add('large-spacing');
        } else {
            root.classList.remove('large-spacing');
        }
    }, [fontSize, highContrast, largeSpacing]);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent/50"
                aria-label="Buka Panel Aksesibilitas"
            >
                {isOpen ? <X size={24} /> : <Settings size={24} className="animate-spin-slow" />}
            </button>

            {/* Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border-2 border-primary p-6 animate-slide-up">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                        <Settings size={20} />
                        Aksesibilitas
                    </h3>

                    {/* Font Size Control */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-navy-dark mb-3">
                            Ukuran Teks: {fontSize}%
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition focus:outline-none focus:ring-2 focus:ring-accent"
                                aria-label="Perkecil Teks"
                            >
                                <ZoomOut size={18} />
                            </button>
                            <input
                                type="range"
                                min="80"
                                max="150"
                                step="10"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                aria-label="Slider Ukuran Teks"
                            />
                            <button
                                onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition focus:outline-none focus:ring-2 focus:ring-accent"
                                aria-label="Perbesar Teks"
                            >
                                <ZoomIn size={18} />
                            </button>
                        </div>
                    </div>

                    {/* High Contrast Toggle */}
                    <div className="mb-6">
                        <button
                            onClick={() => setHighContrast(!highContrast)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition ${highContrast
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-navy-dark border-gray-200 hover:border-accent'
                                }`}
                            aria-pressed={highContrast}
                        >
                            <div className="flex items-center gap-3">
                                <Contrast size={20} />
                                <span className="font-bold">Mode Kontras Tinggi</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full transition ${highContrast ? 'bg-accent' : 'bg-gray-300'}`}>
                                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </div>
                        </button>
                    </div>

                    {/* Large Spacing Toggle */}
                    <div className="mb-4">
                        <button
                            onClick={() => setLargeSpacing(!largeSpacing)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition ${largeSpacing
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-navy-dark border-gray-200 hover:border-accent'
                                }`}
                            aria-pressed={largeSpacing}
                        >
                            <div className="flex items-center gap-3">
                                <Type size={20} />
                                <span className="font-bold">Spasi Besar (1.8x)</span>
                            </div>
                            <div className={`w-12 h-6 rounded-full transition ${largeSpacing ? 'bg-accent' : 'bg-gray-300'}`}>
                                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${largeSpacing ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </div>
                        </button>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={() => {
                            setFontSize(100);
                            setHighContrast(false);
                            setLargeSpacing(false);
                        }}
                        className="w-full py-3 bg-gray-100 text-navy-dark font-bold rounded-xl hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        Reset ke Default
                    </button>
                </div>
            )}
        </>
    );
}
