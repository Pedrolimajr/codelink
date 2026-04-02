import React, { useState } from 'react';
import axios from 'axios';
import { Copy, QrCode, Lock, Calendar, Link as LinkIcon, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customCode: '',
    password: '',
    expiresAt: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    setCopied(false);

    try {
      const response = await axios.post(`${API_BASE}/api/shorten`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao processar link.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center py-12 px-4">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg">
            <LinkIcon className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">CodeLink</h1>
        </div>
        <p className="text-slate-300 font-medium">Encurtador de URLs inteligente, rápido e seguro.</p>
      </header>

      <main className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Cole sua URL longa</label>
            <input
              type="url"
              required
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-600"
              placeholder="https://exemplo.com/sua-url-muito-grande"
              value={formData.originalUrl}
              onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
            />
          </div>

          <button 
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition"
          >
            {showAdvanced ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            Opções Avançadas
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in duration-300">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <LinkIcon size={12} /> Apelido Personalizado
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400"
                  placeholder="ex: meu-link"
                  value={formData.customCode}
                  onChange={(e) => setFormData({ ...formData, customCode: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                    <Lock size={12} /> Senha
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                    <Calendar size={12} /> Expiração
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Processando...' : 'Encurtar Agora'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center font-bold text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

        {result && (
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Link Curto</p>
              <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <span className="text-blue-700 font-bold break-all flex-1">{result.shortUrl}</span>
                <button onClick={copyToClipboard} className="p-2 hover:bg-white rounded-xl transition shadow-sm">
                  {copied ? <CheckCircle className="text-green-500" /> : <Copy className="text-blue-600" size={20} />}
                </button>
              </div>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">QR Code</p>
              <img src={result.qrCode} alt="QR Code" className="w-28 h-28 p-2 bg-white border border-slate-200 rounded-2xl shadow-sm" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;