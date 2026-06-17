import { useEffect, useState } from "react";

export default function MonitorArtigos() {
  const [aba, setAba] = useState('inicio'); 
  const [artigos, setArtigos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setCarregando(true);
        
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts');
        const dados = await resposta.json();
        
        setArtigos(dados);
      } catch (err) {
        console.error("Erro ao sincronizar com a API externa", err);
      } finally {
        setCarregando(false);
      }
    })();
  }, []); 

  const salvarArtigo = (e) => {
    e.preventDefault();
    
    if (!novoTitulo.trim()) return; 

    const novoArtigoObj = {
      id: Date.now(),
      title: novoTitulo 
    };

    setArtigos([novoArtigoObj, ...artigos]);
    setNovoTitulo('');
  };

  return (
    <div className="min-h-screen bg-[#0b111e] text-slate-100 p-6 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        
        <header className="flex justify-between items-center bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <h1 className="text-purple-400 font-extrabold tracking-wide text-sm">
            Accenture <span className="text-slate-500 font-normal text-xs">Blog</span>
          </h1>
          <nav className="flex gap-2">
            <button 
              onClick={() => setAba('inicio')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${aba === 'inicio' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              Início
            </button>
            <button 
              onClick={() => setAba('artigos')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${aba === 'artigos' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
              Artigos
            </button>
          </nav>
        </header>

        {aba === 'inicio' && (
          <div className="bg-slate-800/10 border border-slate-800 p-8 rounded-xl text-center shadow-md">
            <h2 className="text-base font-bold text-white">Revisão Editorial</h2>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Alterne para a aba de artigos para carregar os fluxos de rede assíncronos.
            </p>
          </div>
        )}

        {aba === 'artigos' && (
          <div className="space-y-4">
            
            <form onSubmit={salvarArtigo} className="flex gap-2">
              <input 
                type="text" 
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                placeholder="Escreva o título do novo artigo..."
                className="flex-1 bg-slate-800/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Publicar
              </button>
            </form>

            <div className="bg-slate-800/20 rounded-xl border border-slate-800/60 shadow-lg overflow-hidden">
              <div className="p-3 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feed de Publicações</span>
              </div>

              {carregando && (
                <div className="p-8 flex flex-col items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-400 text-[10px] font-mono animate-pulse">Sincronizando com a API...</p>
                </div>
              )}

              {!carregando && (
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/40">
                  {artigos.map((artigo) => (
                    <div key={artigo.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                      <p className="text-sm text-slate-200">{artigo.title}</p>
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}