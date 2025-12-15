import React, { useState, useEffect } from 'react';

export default function Admin() {
    const [rules, setRules] = useState<any[]>([]);
    const [newRule, setNewRule] = useState({ kategori: '', simbol: '', bacaan: '', contoh: '' });

    useEffect(() => {
        fetch('http://localhost:8787/rules')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setRules(data);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8787/rules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRule)
            });
            if (res.ok) {
                alert('Rule berhasil ditambahkan!');
                window.location.reload();
            }
        } catch (err) {
            alert('Gagal menyimpan rule');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Dashboard Pengajar</h2>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Mode Guru
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span>
                        Tambah Aturan MathSpeak
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                        Definisikan cara pembacaan simbol baru untuk siswa.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                            <input
                                type="text"
                                placeholder="Contoh: Operasi, Pecahan"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={newRule.kategori}
                                onChange={e => setNewRule({ ...newRule, kategori: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Simbol</label>
                                <input
                                    type="text"
                                    placeholder="+, -, /"
                                    className="w-full p-2 border rounded font-mono bg-slate-50"
                                    value={newRule.simbol}
                                    onChange={e => setNewRule({ ...newRule, simbol: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Bacaan (Audio)</label>
                                <input
                                    type="text"
                                    placeholder="tambah, kurang"
                                    className="w-full p-2 border rounded"
                                    value={newRule.bacaan}
                                    onChange={e => setNewRule({ ...newRule, bacaan: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Contoh Penggunaan</label>
                            <input
                                type="text"
                                placeholder="1 + 1 dibaca satu tambah satu"
                                className="w-full p-2 border rounded"
                                value={newRule.contoh}
                                onChange={e => setNewRule({ ...newRule, contoh: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Simpan Aturan Baru
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="bg-accent text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
                        Daftar Aturan Aktif
                    </h3>
                    <div className="overflow-y-auto max-h-[500px]">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 sticky top-0">
                                <tr>
                                    <th className="p-3 font-semibold text-slate-600">Simbol</th>
                                    <th className="p-3 font-semibold text-slate-600">Bacaan</th>
                                    <th className="p-3 font-semibold text-slate-600">Kategori</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rules.map((rule, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition">
                                        <td className="p-3 font-mono font-bold text-primary">{rule.simbol}</td>
                                        <td className="p-3">{rule.bacaan}</td>
                                        <td className="p-3 text-slate-500 text-xs uppercase tracking-wider">{rule.kategori}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {rules.length === 0 && (
                            <p className="text-center text-slate-400 py-8">Belum ada aturan yang ditambahkan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
