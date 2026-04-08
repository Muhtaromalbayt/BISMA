import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
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

    const moveCursorLeft = () => { if (cursorPosition > 0) setCursorPosition(cursorPosition - 1); };
    const moveCursorRight = () => { if (cursorPosition < fractionInput.length) setCursorPosition(cursorPosition + 1); };
    const moveCursorHome = () => setCursorPosition(0);
    const moveCursorEnd = () => setCursorPosition(fractionInput.length);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFractionInput(e.target.value);
        setCursorPosition(e.target.selectionStart || 0);
    };

    const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setCursorPosition(target.selectionStart || 0);
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUploadedImage(reader.result as string);
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

    const clearImage = () => setUploadedImage(null);

    const calculatorButtons = [
        ['7', '8', '9', '/', '(', ')'],
        ['4', '5', '6', '*', '[', ']'],
        ['1', '2', '3', '+', '{', '}'],
        ['0', '.', ' ', '-', '=', '≠'],
        ['a', 'b', 'c', 'x', 'y', 'z'],
        ['^', '√', '∞', '<', '>', '≤'],
        ['π', '±', '≥', '∑', '∫', '∂'],
    ];

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">Pembaca Pecahan</h1>
                    <p className="text-lg text-muted">
                        Gunakan keyboard matematika atau upload foto, lalu dengarkan pengucapan BISMA
                    </p>
                </div>

                {/* Input Method Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setInputMethod('keyboard')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold transition-all rounded-xl border-2 ${inputMethod === 'keyboard'
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white text-muted border-muted/20 hover:border-primary hover:text-primary'
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
                        className={`flex items-center gap-2 px-6 py-3 font-bold transition-all rounded-xl border-2 ${inputMethod === 'image'
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white text-muted border-muted/20 hover:border-primary hover:text-primary'
                            }`}
                    >
                        <Camera size={20} />
                        Upload Foto
                    </button>
                </div>

                {/* Main Card */}
                <div className="glass-panel p-6 md:p-10 rounded-2xl">
                    {/* Keyboard Input Method */}
                    {inputMethod === 'keyboard' && (
                        <div className="space-y-6">
                            {/* Display Area */}
                            <div className="bg-background rounded-xl p-6 border border-muted/20 min-h-[120px]">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 font-mono">Input:</p>
                                <div className="bg-white rounded-lg p-4 min-h-[60px] border border-muted/20 focus-within:border-primary transition-colors shadow-sm">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={fractionInput}
                                        onChange={handleInputChange}
                                        onClick={handleInputClick}
                                        className="w-full text-2xl font-mono text-dark outline-none bg-transparent placeholder-muted/40"
                                        placeholder="Klik tombol di bawah untuk input..."
                                    />
                                </div>
                                <div className="mt-2 text-sm text-muted font-mono">
                                    Posisi cursor: {cursorPosition} / {fractionInput.length}
                                </div>
                            </div>

                            {/* Cursor Navigation Controls */}
                            <div className="bg-background p-4 border border-muted/20 rounded-xl">
                                <p className="text-sm font-bold text-muted mb-3 uppercase tracking-wider">Navigasi Cursor:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {[
                                        { label: 'Awal', icon: <MoveLeft size={16} />, action: moveCursorHome },
                                        { label: 'Kiri', icon: <ChevronLeft size={16} />, action: moveCursorLeft },
                                        { label: 'Kanan', icon: <ChevronRight size={16} />, action: moveCursorRight },
                                        { label: 'Akhir', icon: <MoveRight size={16} />, action: moveCursorEnd },
                                    ].map(btn => (
                                        <button
                                            key={btn.label}
                                            onClick={btn.action}
                                            className="flex items-center justify-center gap-2 px-4 py-2 border border-muted/20 hover:border-primary rounded-lg font-medium text-muted hover:text-primary hover:bg-primary/5 transition-all uppercase text-xs"
                                        >
                                            {btn.icon}
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            {fractionInput && (
                                <div className="bg-primary/5 p-6 border border-primary/20 rounded-xl">
                                    <p className="text-sm font-bold text-primary mb-4 uppercase tracking-widest font-mono">PREVIEW MATEMATIKA:</p>
                                    <div className="flex items-center justify-center min-h-[100px] bg-white border border-muted/20 p-6 rounded-lg shadow-sm">
                                        <MathRenderer
                                            expression={fractionInput}
                                            className="text-5xl text-dark font-bold"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Calculator Keyboard */}
                            <div className="space-y-3">
                                <p className="text-sm font-bold text-muted mb-3 uppercase tracking-wider">Keyboard Matematika:</p>
                                <div className="grid gap-2">
                                    {calculatorButtons.map((row, rowIndex) => (
                                        <div key={rowIndex} className="grid grid-cols-6 gap-2">
                                            {row.map((btn) => (
                                                <button
                                                    key={btn}
                                                    onClick={() => handleButtonClick(btn)}
                                                    className="h-14 bg-white hover:bg-primary hover:text-white border border-muted/20 hover:border-primary rounded-lg font-mono font-bold text-xl text-dark transition-all active:scale-95 shadow-sm"
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
                                        className="h-14 bg-red-50 hover:bg-red-500 border border-red-200 hover:border-red-500 text-red-500 hover:text-white rounded-lg font-bold transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                                    >
                                        <Delete size={20} />
                                        Backspace
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="h-14 bg-orange-50 hover:bg-orange-500 border border-orange-200 hover:border-orange-500 text-orange-500 hover:text-white rounded-lg font-bold transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                                    >
                                        <X size={20} />
                                        Delete
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="h-14 bg-background hover:bg-dark border border-muted/20 hover:border-dark text-muted hover:text-white rounded-lg font-bold transition-all uppercase tracking-wider text-sm"
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
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-muted/30 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-16 h-16 mb-4 text-muted group-hover:text-primary transition-colors" />
                                        <p className="mb-2 text-lg font-bold text-dark uppercase tracking-wider">Klik untuk upload foto</p>
                                        <p className="text-sm text-muted font-mono">PNG, JPG atau JPEG (MAX. 5MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            ) : (
                                <div className="relative">
                                    <img src={uploadedImage} alt="Uploaded fraction" className="w-full h-auto border border-muted/20 shadow-md rounded-xl" />
                                    <button
                                        onClick={clearImage}
                                        className="absolute top-4 right-4 p-2 bg-white border border-muted/20 text-muted hover:text-red-500 hover:border-red-300 transition-colors rounded-lg"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                        <p className="text-sm text-yellow-700 font-mono">
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
                        <div className="mt-8 space-y-6 pt-6 border-t border-muted/20">
                            {/* Speed Control */}
                            <div>
                                <label className="block text-sm font-bold text-muted mb-3 uppercase tracking-wider">
                                    Kecepatan Audio: <span className="text-primary">{audioSpeed}x</span>
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => setAudioSpeed(speed)}
                                            className={`px-5 py-2.5 font-bold transition-all border rounded-lg ${audioSpeed === speed
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-muted border-muted/20 hover:border-primary hover:text-primary'
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
                                className={`w-full py-5 font-bold text-lg flex items-center justify-center gap-3 transition-all rounded-xl border-2 ${isPlaying
                                    ? 'bg-primary text-white border-primary cursor-wait'
                                    : 'bg-white border-primary text-primary hover:bg-primary hover:text-white shadow-md'
                                    }`}
                            >
                                <Volume2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
                                {isPlaying ? 'Memutar Audio...' : 'Dengarkan Pengucapan'}
                            </button>

                            {/* Transcription */}
                            <div className="bg-primary/5 p-6 border border-primary/20 rounded-xl">
                                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2 font-mono">
                                    Transkripsi BISMA:
                                </p>
                                <p className="text-lg font-medium text-dark">
                                    "{toMathSpeak(fractionInput)}"
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Examples */}
                <div className="mt-8 glass-panel p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-dark mb-4 font-display uppercase tracking-wider">Contoh Cepat (Klik untuk input):</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['1/2', '3/4', '2 1/3', '(a+b)/c', '(x+y)/(x-y)', 'x^2+y^2'].map((example) => (
                            <button
                                key={example}
                                onClick={() => {
                                    setInputMethod('keyboard');
                                    setFractionInput(example);
                                    setCursorPosition(example.length);
                                }}
                                className="px-4 py-3 bg-background text-muted border border-muted/20 hover:border-primary hover:text-primary rounded-lg font-bold transition-colors font-mono text-sm"
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
