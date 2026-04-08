import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, Save, FileText, Layout, MessageSquare, BookOpen, Plus, Trash2, Edit2, X, Terminal } from 'lucide-react';

// Interfaces
interface ContentSettings {
    headerTitle: string;
    headerSubtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    footerBrand: string;
    footerDescription: string;
    academicInfo: string[];
}

interface Example {
    expression: string;
    note?: string;
}

interface Rule {
    id: string;
    title: string;
    iconName: string; // Store string name instead of component
    description: string;
    explanation: string;
    examples: Example[];
}

const DEFAULT_RULES: Rule[] = [
    {
        id: 'basic',
        title: 'Pecahan Dasar',
        iconName: 'Hash',
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
        iconName: 'Layers',
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
        iconName: 'GitMerge',
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
        iconName: 'Sigma',
        description: 'Struktur rekursif kompleks.',
        explanation: 'Untuk kedalaman ketiga, gunakan "Mulai Mulai Mulai Pecahan". Pola ini berlanjut sesuai kedalaman.',
        examples: [
            { expression: '1/(1+1/x)', note: 'Pecahan berlanjut sederhana' },
            { expression: '1/(a+1/(b+1/c))', note: 'Pecahan berlanjut kompleks' },
            { expression: 'sqrt(1 + x/y)', note: 'Kombinasi dengan akar' }
        ]
    }
];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'header' | 'hero' | 'footer' | 'rules'>('header');
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    // Content State
    const [content, setContent] = useState<ContentSettings>(() => {
        const saved = localStorage.getItem('bisma_content_settings');
        return saved ? JSON.parse(saved) : {
            headerTitle: 'BISMA',
            headerSubtitle: 'Bahasa Instruksi Simbol Matematika Audio',
            heroTitle: 'BISMA',
            heroSubtitle: 'Bahasa Instruksi Simbol Matematika Audio',
            heroDescription: 'Platform standardisasi cara membaca simbol matematika untuk pembelajar tunanetra.',
            footerBrand: 'BISMA',
            footerDescription: 'Platform standardisasi instruksi simbol matematika audio untuk aksesibilitas pembelajar tunanetra.',
            academicInfo: [
                'Prototype Skripsi 2025',
                'Pendidikan Matematika FPMIPA UPI',
                'Muhtarom Nur Rasyid'
            ]
        };
    });

    // Rules State
    const [rules, setRules] = useState<Rule[]>(() => {
        const saved = localStorage.getItem('bisma_rules');
        return saved ? JSON.parse(saved) : DEFAULT_RULES;
    });

    // Rule Editing State
    const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
    const [tempRule, setTempRule] = useState<Rule | null>(null);

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('bisma_admin_token');
        if (!token) navigate('/admin');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('bisma_admin_token');
        localStorage.removeItem('bisma_admin_user');
        navigate('/admin');
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveMessage('');

        setTimeout(() => {
            localStorage.setItem('bisma_content_settings', JSON.stringify(content));
            localStorage.setItem('bisma_rules', JSON.stringify(rules));
            setSaveMessage('✓ SYSTEM UPDATED SUCCESSFULLY');
            setIsSaving(false);
            setTimeout(() => setSaveMessage(''), 3000);
        }, 1000);
    };

    const updateContent = (field: keyof ContentSettings, value: string | string[]) => {
        setContent((prev: ContentSettings) => ({ ...prev, [field]: value }));
    };

    const updateAcademicInfo = (index: number, value: string) => {
        const newInfo = [...content.academicInfo];
        newInfo[index] = value;
        updateContent('academicInfo', newInfo);
    };

    // Rule Management Functions
    const handleAddRule = () => {
        const newRule: Rule = {
            id: `rule_${Date.now()}`,
            title: 'Aturan Baru',
            iconName: 'BookOpen',
            description: 'Deskripsi aturan baru',
            explanation: 'Penjelasan detail aturan',
            examples: []
        };
        setRules([...rules, newRule]);
        setEditingRuleId(newRule.id);
        setTempRule(newRule);
    };

    const handleDeleteRule = (id: string) => {
        if (window.confirm('Delete this rule permanently?')) {
            setRules(rules.filter((r: Rule) => r.id !== id));
            if (editingRuleId === id) {
                setEditingRuleId(null);
                setTempRule(null);
            }
        }
    };

    const startEditingRule = (rule: Rule) => {
        setEditingRuleId(rule.id);
        setTempRule({ ...rule });
    };

    const saveRuleEdit = () => {
        if (tempRule) {
            setRules(rules.map((r: Rule) => r.id === tempRule.id ? tempRule : r));
            setEditingRuleId(null);
            setTempRule(null);
        }
    };

    const cancelRuleEdit = () => {
        setEditingRuleId(null);
        setTempRule(null);
    };

    const addExampleToTempRule = () => {
        if (tempRule) {
            setTempRule({
                ...tempRule,
                examples: [...tempRule.examples, { expression: '', note: '' }]
            });
        }
    };

    const updateExampleInTempRule = (index: number, field: keyof Example, value: string) => {
        if (tempRule) {
            const newExamples = [...tempRule.examples];
            newExamples[index] = { ...newExamples[index], [field]: value };
            setTempRule({ ...tempRule, examples: newExamples });
        }
    };

    const removeExampleFromTempRule = (index: number) => {
        if (tempRule) {
            const newExamples = tempRule.examples.filter((_, i: number) => i !== index);
            setTempRule({ ...tempRule, examples: newExamples });
        }
    };

    return (
        <div className="min-h-screen bg-obsidian pb-20 font-sans">
            {/* Admin Header */}
            <header className="bg-obsidian-light border-b border-white/5 sticky top-0 z-40 backdrop-blur-lg bg-opacity-80">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-electric/10 border border-electric/30">
                                <Shield size={24} className="text-electric" />
                            </div>
                            <div>
                                <h1 className="text-xl font-display font-bold text-white uppercase tracking-widest">Control Panel</h1>
                                <p className="text-ash text-xs font-mono">System Configuration Mode</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-all rounded-none"
                        >
                            <LogOut size={16} />
                            Exit
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Save Message */}
                {saveMessage && (
                    <div className="mb-6 p-4 bg-electric/10 border-l-2 border-electric flex items-center gap-3 animate-fade-in">
                        <Terminal size={18} className="text-electric" />
                        <p className="text-electric font-mono text-xs">{saveMessage}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="glass-panel p-4 sticky top-24">
                            <h2 className="text-xs font-bold text-ash/50 uppercase tracking-widest font-mono mb-4 px-2">Navigation</h2>
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('header')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-bold text-xs uppercase tracking-wide transition-all ${activeTab === 'header' ? 'bg-electric text-obsidian border-l-2 border-obsidian' : 'text-ash hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-electric'}`}
                                >
                                    <Layout size={16} />
                                    Header Config
                                </button>
                                <button
                                    onClick={() => setActiveTab('hero')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-bold text-xs uppercase tracking-wide transition-all ${activeTab === 'hero' ? 'bg-electric text-obsidian border-l-2 border-obsidian' : 'text-ash hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-electric'}`}
                                >
                                    <FileText size={16} />
                                    Hero Section
                                </button>
                                <button
                                    onClick={() => setActiveTab('footer')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-bold text-xs uppercase tracking-wide transition-all ${activeTab === 'footer' ? 'bg-electric text-obsidian border-l-2 border-obsidian' : 'text-ash hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-electric'}`}
                                >
                                    <MessageSquare size={16} />
                                    Footer
                                </button>
                                <div className="h-px bg-white/10 my-3 mx-2"></div>
                                <button
                                    onClick={() => setActiveTab('rules')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-bold text-xs uppercase tracking-wide transition-all ${activeTab === 'rules' ? 'bg-neon/20 text-neon border-l-2 border-neon' : 'text-ash hover:bg-white/5 hover:text-white border-l-2 border-transparent hover:border-neon'}`}
                                >
                                    <BookOpen size={16} />
                                    Rules Database
                                </button>
                            </nav>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`w-full mt-6 flex items-center justify-center gap-2 px-4 py-4 font-bold text-xs uppercase tracking-widest transition-all ${isSaving ? 'bg-ash/20 text-ash cursor-not-allowed' : 'bg-electric text-obsidian hover:bg-white hover:text-obsidian shadow-lg'}`}
                            >
                                <Save size={16} />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="lg:col-span-3">
                        <div className="glass-panel p-6 md:p-8 min-h-[500px]">

                            {/* Header Tab */}
                            {activeTab === 'header' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                        <Layout className="text-electric" size={24} />
                                        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Header Config</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">App Title</label>
                                            <input type="text" value={content.headerTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('headerTitle', e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Subtitle</label>
                                            <input type="text" value={content.headerSubtitle} onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('headerSubtitle', e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Hero Tab */}
                            {activeTab === 'hero' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                        <FileText className="text-electric" size={24} />
                                        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Hero Section</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Main Title</label>
                                            <input type="text" value={content.heroTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('heroTitle', e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-white text-xl font-bold" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Hero Subtitle</label>
                                            <input type="text" value={content.heroSubtitle} onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('heroSubtitle', e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Description</label>
                                            <textarea value={content.heroDescription} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateContent('heroDescription', e.target.value)} rows={4} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-ash-light font-sans text-sm resize-none" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer Tab */}
                            {activeTab === 'footer' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                        <MessageSquare className="text-electric" size={24} />
                                        <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Footer Config</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Brand Name</label>
                                            <input type="text" value={content.footerBrand} onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('footerBrand', e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Footer Text</label>
                                            <textarea value={content.footerDescription} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateContent('footerDescription', e.target.value)} rows={3} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-ash-light text-sm resize-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-3 font-mono">Academic Credentials</label>
                                            <div className="space-y-3">
                                                {content.academicInfo.map((info: string, index: number) => (
                                                    <input key={index} type="text" value={info} onChange={(e: ChangeEvent<HTMLInputElement>) => updateAcademicInfo(index, e.target.value)} className="w-full px-4 py-3 bg-obsidian border border-white/10 focus:border-electric focus:outline-none text-ash font-mono text-sm" placeholder={`Info Line ${index + 1}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Rules Tab */}
                            {activeTab === 'rules' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="text-neon" size={24} />
                                            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">Rules Database</h2>
                                        </div>
                                        <button onClick={handleAddRule} className="flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/30 text-neon hover:bg-neon hover:text-obsidian font-mono text-xs font-bold uppercase tracking-widest transition-all">
                                            <Plus size={16} />
                                            Add Rule
                                        </button>
                                    </div>

                                    {/* Rule Editor Modal/Form */}
                                    {editingRuleId && tempRule && (
                                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                                            <div className="bg-obsidian border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                                                <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-obsidian z-10">
                                                    <div className="flex items-center gap-3">
                                                        <Edit2 className="text-electric" size={20} />
                                                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">Edit Rule</h3>
                                                    </div>
                                                    <button onClick={cancelRuleEdit} className="p-2 hover:bg-white/10 text-white rounded-full"><X size={20} /></button>
                                                </div>

                                                <div className="p-6 space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Title</label>
                                                            <input type="text" value={tempRule.title} onChange={(e) => setTempRule({ ...tempRule, title: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-white font-bold" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Icon ID</label>
                                                            <select value={tempRule.iconName} onChange={(e) => setTempRule({ ...tempRule, iconName: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm">
                                                                <option value="Hash">Hash (Basic)</option>
                                                                <option value="Layers">Layers (Mixed)</option>
                                                                <option value="GitMerge">GitMerge (Nested)</option>
                                                                <option value="Sigma">Sigma (Advanced)</option>
                                                                <option value="BookOpen">BookOpen (General)</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Short Description</label>
                                                        <input type="text" value={tempRule.description} onChange={(e) => setTempRule({ ...tempRule, description: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-white" />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-bold text-ash uppercase tracking-widest mb-2 font-mono">Detailed Explanation</label>
                                                        <textarea value={tempRule.explanation} onChange={(e) => setTempRule({ ...tempRule, explanation: e.target.value })} rows={3} className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-ash-light resize-none" />
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                                            <label className="block text-[10px] font-bold text-ash uppercase tracking-widest font-mono">Examples</label>
                                                            <button onClick={addExampleToTempRule} className="text-[10px] text-electric font-bold uppercase tracking-widest hover:underline">+ Add Example</button>
                                                        </div>
                                                        <div className="space-y-4">
                                                            {tempRule.examples.map((ex: Example, idx: number) => (
                                                                <div key={idx} className="flex gap-3 items-start bg-white/5 p-3 border border-white/10">
                                                                    <div className="flex-1 space-y-2">
                                                                        <input type="text" value={ex.expression} onChange={(e: ChangeEvent<HTMLInputElement>) => updateExampleInTempRule(idx, 'expression', e.target.value)} placeholder="LaTeX Expression" className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-white font-mono text-sm" />
                                                                        <input type="text" value={ex.note || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => updateExampleInTempRule(idx, 'note', e.target.value)} placeholder="Note (Optional)" className="w-full px-3 py-2 bg-black/50 border border-white/10 focus:border-electric focus:outline-none text-ash text-xs" />
                                                                    </div>
                                                                    <button onClick={() => removeExampleFromTempRule(idx)} className="p-2 text-red-500 hover:bg-white/10"><Trash2 size={16} /></button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-obsidian z-10">
                                                    <button onClick={cancelRuleEdit} className="px-6 py-2 text-ash hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">Cancel</button>
                                                    <button onClick={saveRuleEdit} className="px-6 py-2 bg-electric text-obsidian hover:bg-white hover:text-obsidian font-bold text-xs uppercase tracking-widest transition-colors shadow-lg">Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rules List */}
                                    <div className="space-y-4">
                                        {rules.map((rule: Rule) => (
                                            <div key={rule.id} className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-electric transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-obsidian border border-white/10 group-hover:border-electric/50 text-ash group-hover:text-electric transition-colors">
                                                        {rule.iconName === 'Hash' && <Terminal size={20} />}
                                                        {rule.iconName === 'Layers' && <Layout size={20} />}
                                                        {rule.iconName === 'GitMerge' && <Terminal size={20} />}
                                                        {rule.iconName === 'Sigma' && <Terminal size={20} />}
                                                        {rule.iconName === 'BookOpen' && <BookOpen size={20} />}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-white font-display uppercase tracking-wide">{rule.title}</h3>
                                                        <p className="text-ash text-sm line-clamp-1">{rule.description}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            <span className="text-[10px] bg-white/10 text-ash-light px-2 py-1 uppercase tracking-wider font-mono">{rule.examples.length} Examples</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => startEditingRule(rule)} className="p-2 text-ash hover:text-electric hover:bg-white/5 transition-colors" title="Edit">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDeleteRule(rule.id)} className="p-2 text-ash hover:text-red-500 hover:bg-white/5 transition-colors" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Preview Button */}
                        <div className="mt-8 text-center">
                            <button onClick={() => window.open('/', '_blank')} className="inline-flex items-center gap-2 px-8 py-3 bg-obsidian border border-white/20 text-white hover:border-white transition-colors font-mono text-xs uppercase tracking-widest">
                                <Terminal size={16} />
                                Launch Live Preview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
