import { useState } from 'react';
import { BookOpen, ChevronRight, Info, Layers, Hash, GitMerge, Sigma, Volume2, PlayCircle, Gauge, Settings } from 'lucide-react';
import MathRenderer from '../components/MathRenderer';
import { toMathSpeak } from '../utils/mathspeak';
import { playText } from '../utils/sonification';

interface Example {
    expression: string;
    readAs?: string;
    note?: string;
}

interface Rule {
    id: string;
    title: string;
    icon: any;
    description: string;
    explanation: string;
    examples: Example[];
}

const DEFAULT_RULES: Rule[] = [
    {
        id: 'basic',
        title: 'Pecahan Dasar',
        icon: Hash,
        description: 'Aturan dasar pecahan sederhana.',
        explanation: 'Gunakan pola "Mulai Pecahan ... Per ... Selesai Pecahan" untuk memisahkan pembilang dan penyebut dengan jelas.',
        examples: [
            { expression: '1/2', note: 'Pecahan sederhana' },
            { expression: '3/4', note: 'Pecahan biasa' },
            { expression: '5/8', note: 'Pecahan dengan angka lebih besar' }
        ]
    },
    {
        id: 'mixed_complex',
        title: 'Pecahan Campuran',
        icon: Layers,
        description: 'Bilangan bulat dan variabel.',
        explanation: 'Bilangan bulat dibaca terpisah. Variabel dibaca sesuai abjad dengan jeda yang tepat.',
        examples: [
            { expression: '2 1/3', note: 'Pecahan campuran' },
            { expression: 'x + y/z', note: 'Dengan variabel' },
            { expression: '(a+b)/(c-d)', note: 'Operasi dalam pecahan' }
        ]
    },
    {
        id: 'nested_advanced',
        title: 'Pecahan Bertingkat',
        icon: GitMerge,
        description: 'Pecahan di dalam pecahan.',
        explanation: 'Gunakan "Mulai Mulai Pecahan" untuk menandakan lapisan kedua agar struktur tetap jelas.',
        examples: [
            { expression: '(1/2)/3', note: 'Pecahan di pembilang' },
            { expression: 'x/(y/z)', note: 'Pecahan di penyebut' },
            { expression: '(a/b)/(c/d)', note: 'Pecahan kompleks' }
        ]
    },
    {
        id: 'continued_fraction',
        title: 'Pecahan Lanjut',
        icon: Sigma,
        description: 'Struktur rekursif kompleks.',
        explanation: 'Untuk kedalaman ketiga, gunakan "Mulai Mulai Mulai Pecahan". Pola ini berlanjut sesuai kedalaman.',
        examples: [
            { expression: '1/(1+1/x)', note: 'Pecahan berlanjut sederhana' },
            { expression: '1/(a+1/(b+1/c))', note: 'Pecahan berlanjut kompleks' },
            { expression: 'sqrt(1 + x/y)', note: 'Kombinasi dengan akar' }
        ]
    }
];

const speedOptions = [
    { value: 0.5, label: '0.5x (Lambat)' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x (Normal)' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x (Cepat)' }
];

type VerbosityLevel = 'verbose' | 'brief' | 'superbrief' | 'compare';

const verbosityOptions = [
    { value: 'verbose' as VerbosityLevel, label: 'Lengkap', shortLabel: 'Verbose', description: 'Pembacaan lengkap dengan semua penanda' },
    { value: 'brief' as VerbosityLevel, label: 'Ringkas', shortLabel: 'Brief', description: 'Pembacaan ringkas tanpa beberapa penanda' },
    { value: 'superbrief' as VerbosityLevel, label: 'Sangat Ringkas', shortLabel: 'Superbrief', description: 'Pembacaan minimal, hanya inti' },
    { value: 'compare' as VerbosityLevel, label: 'Bandingkan Semua', shortLabel: 'Compare', description: 'Tampilkan semua tingkat verbosity' }
];

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Hash': return Hash;
        case 'Layers': return Layers;
        case 'GitMerge': return GitMerge;
        case 'Sigma': return Sigma;
        default: return BookOpen;
    }
};

export default function Rules() {
    const [rules] = useState<Rule[]>(() => {
        const saved = localStorage.getItem('bisma_rules');
        if (saved) {
            const parsed = JSON.parse(saved);
            return parsed.map((r: any) => ({
                ...r,
                icon: getIcon(r.iconName || 'BookOpen')
            }));
        }
        return DEFAULT_RULES;
    });

    const [selectedRule, setSelectedRule] = useState<string>('basic');
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const [audioSpeed, setAudioSpeed] = useState<number>(1);
    const [verbosity, setVerbosity] = useState<VerbosityLevel>('verbose');

    const currentRule = rules.find(r => r.id === selectedRule) || rules[0];

    const toMathSpeakWithVerbosity = (expression: string, level: VerbosityLevel): string => {
        const fullText = toMathSpeak(expression);
        if (level === 'verbose') return fullText;
        if (level === 'brief') {
            return fullText
                .replace(/Mulai Pecahan,?\s*/gi, '')
                .replace(/,?\s*Selesai Pecahan/gi, '')
                .replace(/Mulai Mulai Pecahan,?\s*/gi, '')
                .replace(/,?\s*Selesai Selesai Pecahan/gi, '');
        }
        if (level === 'superbrief') {
            return fullText
                .replace(/Mulai Pecahan,?\s*/gi, '')
                .replace(/,?\s*Selesai Pecahan/gi, '')
                .replace(/Mulai Mulai Pecahan,?\s*/gi, '')
                .replace(/,?\s*Selesai Selesai Pecahan/gi, '')
                .replace(/Per Per/gi, 'per')
                .replace(/Per,?\s*/gi, 'per ')
                .replace(/,\s*/g, ' ');
        }
        return fullText;
    };

    const handlePlay = (expression: string, index: number, level: VerbosityLevel = verbosity) => {
        setPlayingIndex(index);
        const text = toMathSpeakWithVerbosity(expression, level);
        playText(text, audioSpeed);
        const duration = Math.max(2000, (text.length * 80) / audioSpeed);
        setTimeout(() => setPlayingIndex(null), duration);
    };

    return (
        <div className="min-h-screen bg-background font-sans pb-20">
            {/* Page Header */}
            <div className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 text-white/90 text-xs font-mono font-bold mb-4 uppercase tracking-widest rounded-full">
                        <BookOpen size={14} />
                        Panduan Lengkap
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Aturan Baca Standar</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Panduan sintaks audio BISMA untuk berbagai struktur pecahan matematika
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3">
                        <div className="glass-panel p-2 sticky top-24 rounded-xl">
                            <div className="px-3 py-2 mb-2">
                                <p className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Kategori</p>
                            </div>
                            {rules.map((rule: Rule) => (
                                <button
                                    key={rule.id}
                                    onClick={() => setSelectedRule(rule.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-bold flex items-center gap-3 mb-1 text-xs ${selectedRule === rule.id
                                        ? 'bg-primary text-white'
                                        : 'text-muted hover:bg-primary/10 hover:text-primary'
                                        }`}
                                >
                                    <rule.icon size={18} />
                                    <span className="flex-1">{rule.title}</span>
                                    {selectedRule === rule.id && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="glass-panel p-6 md:p-8 min-h-[600px] rounded-xl">

                            {/* Rule Info */}
                            <div className="mb-8 border-b border-muted/20 pb-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                        <currentRule.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-dark">{currentRule.title}</h2>
                                        <p className="text-muted">{currentRule.description}</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 p-5 border border-primary/20 flex gap-3 mb-6 rounded-xl">
                                    <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
                                    <p className="text-dark leading-relaxed">{currentRule.explanation}</p>
                                </div>

                                {/* Verbosity Settings */}
                                <div className="bg-background border border-muted/20 p-4 mb-4 rounded-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Settings className="text-secondary" size={18} />
                                        <label className="text-xs font-bold text-dark uppercase tracking-widest">Tingkat Verbosity (Detail)</label>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {verbosityOptions.map((option: { value: VerbosityLevel, label: string, shortLabel: string, description: string }) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setVerbosity(option.value)}
                                                className={`px-3 py-2 text-xs font-bold transition-all rounded-lg border ${verbosity === option.value
                                                    ? 'bg-secondary/20 text-secondary border-secondary'
                                                    : 'bg-transparent text-muted border-muted/20 hover:border-secondary hover:text-secondary'
                                                    }`}
                                                title={option.description}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted mt-2 font-mono">
                                        {verbosityOptions.find(o => o.value === verbosity)?.description}
                                    </p>
                                </div>

                                {/* Audio Speed Control */}
                                <div className="bg-background border border-muted/20 p-4 rounded-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Gauge className="text-primary" size={18} />
                                        <label className="text-xs font-bold text-dark uppercase tracking-widest">Kecepatan Audio</label>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {speedOptions.map((option: { value: number, label: string }) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setAudioSpeed(option.value)}
                                                className={`px-4 py-2 text-xs font-bold transition-all rounded-lg border ${audioSpeed === option.value
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'bg-transparent text-muted border-muted/20 hover:border-primary hover:text-primary'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Examples Grid */}
                            <div className="space-y-6">
                                {currentRule.examples.map((example: Example, index: number) => {
                                    const isPlaying = playingIndex === index;

                                    if (verbosity === 'compare') {
                                        return (
                                            <div key={index} className="bg-background border border-muted/20 overflow-hidden rounded-xl">
                                                <div className="bg-primary/10 p-4 border-b border-muted/20 flex items-center justify-center">
                                                    <MathRenderer expression={example.expression} className="text-3xl text-dark font-bold" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-muted/20">
                                                    {['verbose', 'brief', 'superbrief'].map((level) => {
                                                        const levelText = toMathSpeakWithVerbosity(example.expression, level as VerbosityLevel);
                                                        const levelOption = verbosityOptions.find(o => o.value === level);
                                                        return (
                                                            <div key={level} className="p-4">
                                                                <div className="mb-2">
                                                                    <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary border border-secondary/30 text-[10px] font-bold font-mono uppercase tracking-wider rounded">
                                                                        {levelOption?.shortLabel}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-dark leading-relaxed mb-3 font-mono">
                                                                    "{levelText}"
                                                                </p>
                                                                <button
                                                                    onClick={() => handlePlay(example.expression, index, level as VerbosityLevel)}
                                                                    className="flex items-center gap-2 px-3 py-2 bg-secondary/10 hover:bg-secondary hover:text-white border border-secondary/30 text-secondary transition-colors text-xs font-bold rounded-lg w-full justify-center"
                                                                >
                                                                    {isPlaying ? <Volume2 size={14} className="animate-pulse" /> : <PlayCircle size={14} />}
                                                                    Dengar
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {example.note && (
                                                    <div className="bg-primary/5 p-3 border-t border-muted/20 text-center">
                                                        <div className="inline-flex items-center gap-2 text-xs text-muted font-mono">
                                                            <Info size={12} />
                                                            <span>{example.note}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    } else {
                                        const mathSpeakText = toMathSpeakWithVerbosity(example.expression, verbosity);
                                        return (
                                            <div key={index} className="bg-background border border-muted/20 hover:border-primary transition-colors overflow-hidden group rounded-xl">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="w-full md:w-48 bg-primary/5 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-muted/20 group-hover:bg-primary/10 transition-colors">
                                                        <MathRenderer expression={example.expression} className="text-2xl text-dark font-bold" />
                                                        <button
                                                            onClick={() => handlePlay(example.expression, index)}
                                                            className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors shadow-md rounded-lg"
                                                        >
                                                            {isPlaying ? <Volume2 size={16} className="animate-pulse" /> : <PlayCircle size={16} />}
                                                            {isPlaying ? 'Putar...' : 'Dengar'}
                                                        </button>
                                                    </div>

                                                    <div className="flex-1 p-5 flex flex-col justify-center">
                                                        <div className="mb-2 flex justify-between items-center">
                                                            <div className="text-xs font-bold text-muted uppercase tracking-widest font-mono">
                                                                Transkripsi ({verbosityOptions.find(o => o.value === verbosity)?.shortLabel})
                                                            </div>
                                                            {example.note && (
                                                                <span className="text-[10px] text-primary uppercase tracking-wider font-bold border border-primary/30 px-2 py-0.5 bg-primary/10 rounded">
                                                                    {example.note}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-lg font-normal text-dark leading-relaxed font-mono">
                                                            "{mathSpeakText}"
                                                        </p>
                                                    </div>
                                                </div>
                                                {isPlaying && (
                                                    <div className="h-1 bg-primary/20 w-full">
                                                        <div className="h-full bg-primary animate-[width_2s_linear_forwards]" style={{ width: '100%' }}></div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
