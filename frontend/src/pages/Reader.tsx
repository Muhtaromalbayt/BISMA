import { useState, useRef, useEffect } from 'react';
import { Camera, Volume2, Upload, X, Delete, ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react';
import MathRenderer from '../components/MathRenderer';
import { toMathSpeak } from '../utils/mathspeak';
import { playText } from '../utils/sonification';

export default function Reader() {
    const [inputMethod, setInputMethod] = useState<'keyboard' | 'image'>('keyboard');
    const [fractionInput, setFractionInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSpeed, setAudioSpeed] = useState(1);

    // Update cursor position when input changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
    }, [cursorPosition, fractionInput]);

    const handleButtonClick = (value: string) => {
        const before = fractionInput.slice(0, cursorPosition);
        const after = fractionInput.slice(cursorPosition);
        setFractionInput(before + value + after);
        setCursorPosition(cursorPosition + value.length);
    };

    const handleClear = () => {
        setFractionInput('');
        setCursorPosition(0);
    };

    const handleBackspace = () => {
        if (cursorPosition > 0) {
            const before = fractionInput.slice(0, cursorPosition - 1);
            const after = fractionInput.slice(cursorPosition);
            setFractionInput(before + after);
            setCursorPosition(cursorPosition - 1);
        }
    };

    const handleDelete = () => {
        if (cursorPosition < fractionInput.length) {
            const before = fractionInput.slice(0, cursorPosition);
            const after = fractionInput.slice(cursorPosition + 1);
            setFractionInput(before + after);
        }
    };

    const moveCursorLeft = () => {
        if (cursorPosition > 0) {
            setCursorPosition(cursorPosition - 1);
        }
    };

    const moveCursorRight = () => {
        if (cursorPosition < fractionInput.length) {
            setCursorPosition(cursorPosition + 1);
        }
    };

    const moveCursorHome = () => {
        setCursorPosition(0);
    };

    const moveCursorEnd = () => {
        setCursorPosition(fractionInput.length);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFractionInput(e.target.value);
        setCursorPosition(e.target.selectionStart || 0);
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setCursorPosition(target.selectionStart || 0);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePlay = () => {
        if (!fractionInput) return;
        setIsPlaying(true);
        const text = toMathSpeak(fractionInput);
        playText(text, audioSpeed);
        const duration = Math.max(2000, (text.length * 80) / audioSpeed);
        setTimeout(() => setIsPlaying(false), duration);
    };

    const clearImage = () => {
        setUploadedImage(null);
    };

    // Calculator buttons configuration with important mathematical symbols
    const calculatorButtons = [
        // Row 1: Numbers 7-9 and basic operators
        ['7', '8', '9', '/', '(', ')'],
        // Row 2: Numbers 4-6 and operators
        ['4', '5', '6', '*', '[', ']'],
        // Row 3: Numbers 1-3 and operators
        ['1', '2', '3', '+', '{', '}'],
        // Row 4: Special numbers and operators
        ['0', '.', ' ', '-', '=', '≠'],
        // Row 5: Variables
        ['a', 'b', 'c', 'x', 'y', 'z'],
        // Row 6: Mathematical symbols
        ['^', '√', '∞', '<', '>', '≤'],
        // Row 7: Advanced symbols
        ['π', '±', '≥', '∑', '∫', '∂'],
    ];

    return (
        <div className="min-h-screen bg-obsidian py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-wider">Pembaca Pecahan</h1>
                    <p className="text-lg text-ash">
                        Gunakan keyboard matematika atau upload foto, lalu dengarkan pengucapan BISMA
                    </p>
                </div>

                {/* Input Method Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setInputMethod('keyboard')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold transition-all uppercase tracking-wider rounded-none border ${inputMethod === 'keyboard'
                            ? 'bg-electric text-obsidian border-electric font-bold'
                            : 'bg-transparent text-ash border-white/10 hover:border-electric hover:text-electric'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
                            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Keyboard Matematika
                    </button>
                    <button
                        onClick={() => setInputMethod('image')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold transition-all uppercase tracking-wider rounded-none border ${inputMethod === 'image'
                            ? 'bg-electric text-obsidian border-electric font-bold'
                            : 'bg-transparent text-ash border-white/10 hover:border-electric hover:text-electric'
                            }`}
                    >
                        <Camera size={20} />
                        Upload Foto
                    </button>
                </div>

                {/* Main Card */}
                <div className="glass-panel p-6 md:p-10">
                    {/* Keyboard Input Method */}
                    {inputMethod === 'keyboard' && (
                        <div className="space-y-6">
                            {/* Display Area with Editable Input */}
                            <div className="bg-obsidian rounded-none p-6 border border-white/10 min-h-[120px]">
                                <p className="text-xs font-bold text-electric uppercase tracking-wider mb-2 font-mono">Input:</p>
                                <div className="bg-white/5 rounded-none p-4 min-h-[60px] border border-white/10 focus-within:border-electric transition-colors">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={fractionInput}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="w-full text-2xl font-mono text-white outline-none bg-transparent placeholder-ash/30"
                                        placeholder="Klik tombol di bawah untuk input..."
                                    />
                                </div>
                                <div className="mt-2 text-sm text-ash font-mono">
                                    Posisi cursor: {cursorPosition} / {fractionInput.length}
                                </div>
                            </div>

                            {/* Cursor Navigation Controls */}
                            <div className="bg-white/5 p-4 border border-white/10">
                                <p className="text-sm font-bold text-ash mb-3 uppercase tracking-wider">Navigasi Cursor:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <button
                                        onClick={moveCursorHome}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-electric/50 rounded-none font-medium text-ash hover:text-electric hover:bg-electric/10 transition-all uppercase text-xs tracking-wider"
                                    >
                                        <MoveLeft size={16} />
                                        Awal
                                    </button>
                                    <button
                                        onClick={moveCursorLeft}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-electric/50 rounded-none font-medium text-ash hover:text-electric hover:bg-electric/10 transition-all uppercase text-xs tracking-wider"
                                    >
                                        <ChevronLeft size={16} />
                                        Kiri
                                    </button>
                                    <button
                                        onClick={moveCursorRight}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-electric/50 rounded-none font-medium text-ash hover:text-electric hover:bg-electric/10 transition-all uppercase text-xs tracking-wider"
                                    >
                                        Kanan
                                        <ChevronRight size={16} />
                                    </button>
                                    <button
                                        onClick={moveCursorEnd}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-electric/50 rounded-none font-medium text-ash hover:text-electric hover:bg-electric/10 transition-all uppercase text-xs tracking-wider"
                                    >
                                        Akhir
                                        <MoveRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Preview */}
                            {fractionInput && (
                                <div className="bg-electric/5 p-6 border border-electric/30">
                                    <p className="text-sm font-bold text-electric mb-4 uppercase tracking-widest font-mono">PREVIEW MATEMATIKA:</p>
                                    <div className="flex items-center justify-center min-h-[100px] bg-obsidian border border-white/10 p-6 shadow-inner">
                                        <MathRenderer
                                            expression={fractionInput}
                                            className="text-5xl text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Calculator Keyboard */}
                            <div className="space-y-3">
                                <p className="text-sm font-bold text-ash mb-3 uppercase tracking-wider">Keyboard Matematika:</p>

                                {/* Number and Operator Buttons */}
                                <div className="grid gap-2">
                                    {calculatorButtons.map((row, rowIndex) => (
                                        <div key={rowIndex} className="grid grid-cols-6 gap-2">
                                            {row.map((btn) => (
                                                <button
                                                    key={btn}
                                                    onClick={() => handleButtonClick(btn)}
                                                    className="h-14 bg-white/5 hover:bg-electric hover:text-obsidian border border-white/10 hover:border-electric rounded-none font-mono font-bold text-xl text-white transition-all active:scale-95"
                                                >
                                                    {btn === ' ' ? '␣' : btn}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Control Buttons */}
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    <button
                                        onClick={handleBackspace}
                                        className="h-14 bg-red-900/20 hover:bg-red-600 border border-red-900/50 hover:border-red-500 text-red-500 hover:text-white rounded-none font-bold transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                                    >
                                        <Delete size={20} />
                                        Backspace
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="h-14 bg-orange-900/20 hover:bg-orange-600 border border-orange-900/50 hover:border-orange-500 text-orange-500 hover:text-white rounded-none font-bold transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                                    >
                                        <X size={20} />
                                        Delete
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="h-14 bg-white/10 hover:bg-white border border-white/20 hover:border-white text-white hover:text-obsidian rounded-none font-bold transition-all uppercase tracking-wider text-sm"
                                    >
                                        Clear (C)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Image Upload Method */}
                    {inputMethod === 'image' && (
                        <div className="space-y-6">
                            {!uploadedImage ? (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-none cursor-pointer hover:border-electric hover:bg-electric/5 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-16 h-16 mb-4 text-ash group-hover:text-electric transition-colors" />
                                        <p className="mb-2 text-lg font-bold text-white uppercase tracking-wider">Klik untuk upload foto</p>
                                        <p className="text-sm text-ash font-mono">PNG, JPG atau JPEG (MAX. 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded fraction"
                                        className="w-full h-auto border border-white/10 shadow-2xl"
                                    />
                                    <button
                                        onClick={clearImage}
                                        className="absolute top-4 right-4 p-2 bg-obsidian border border-electric text-electric hover:bg-electric hover:text-obsidian transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/50">
                                        <p className="text-sm text-yellow-500 font-mono">
                                            <strong>CATATAN:</strong> Fitur OCR (pengenalan teks dari gambar) akan segera hadir.
                                            Untuk saat ini, silakan gunakan keyboard matematika.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Audio Controls */}
                    {fractionInput && inputMethod === 'keyboard' && (
                        <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
                            {/* Speed Control */}
                            <div>
                                <label className="block text-sm font-bold text-ash mb-3 uppercase tracking-wider">
                                    Kecepatan Audio: <span className="text-electric">{audioSpeed}x</span>
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => setAudioSpeed(speed)}
                                            className={`px-5 py-2.5 font-bold transition-all border rounded-none ${audioSpeed === speed
                                                ? 'bg-electric text-obsidian border-electric'
                                                : 'bg-transparent text-ash border-white/10 hover:border-electric hover:text-electric'
                                                }`}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Play Button */}
                            <button
                                onClick={handlePlay}
                                disabled={isPlaying}
                                className={`w-full py-5 font-bold text-lg flex items-center justify-center gap-3 transition-all uppercase tracking-widest ${isPlaying
                                    ? 'bg-electric text-obsidian border border-electric cursor-wait'
                                    : 'bg-transparent border border-electric text-electric hover:bg-electric hover:text-obsidian shadow-[0_0_15px_rgba(204,255,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                    }`}
                            >
                                <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
                                {isPlaying ? 'Memutar Audio...' : 'Dengarkan Pengucapan'}
                            </button>

                            {/* Transcription */}
                            <div className="bg-white/5 p-6 border border-white/10 shadow-inner">
                                <p className="text-xs font-bold text-ash uppercase tracking-wider mb-2 font-mono">
                                    Transkripsi BISMA:
                                </p>
                                <p className="text-lg font-medium text-white">
                                    "{toMathSpeak(fractionInput)}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Examples */}
                <div className="mt-8 glass-panel p-6">
                    <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-wider">Contoh Cepat (Klik untuk input):</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['1/2', '3/4', '2 1/3', '(a+b)/c', '(x+y)/(x-y)', 'x^2+y^2'].map((example) => (
                            <button
                                key={example}
                                onClick={() => {
                                    setInputMethod('keyboard');
                                    setFractionInput(example);
                                    setCursorPosition(example.length);
                                }}
                                className="px-4 py-3 bg-white/5 text-ash border border-white/10 hover:border-electric hover:text-electric rounded-none font-bold transition-colors font-mono text-sm"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
