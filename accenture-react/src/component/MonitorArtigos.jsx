/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function MonitorArtigos() {
  // PASSO A: CONECTAR OS MOTORES REATIVOS
  const [tab ,setTab] = useState("inicio")
  const [article, setArticle] = useState([])
  let [loading,setLoading] = useState(false)
  const [title, setTitle] = useState("")

  // PASSO B: ORQUESTRAÇÃO ASSÍNCRONA DA API (Slides 27, 28 e 29)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        
        setArticle(data)
        
      } catch (err) {
        console.error("Erro ao sincronizar com a API externa", err);
      } finally {
        setLoading(false)
        
      }
    })();
  }, []); // Array vazio executa apenas no mount físico

  // PASSO C: A REGRA DE OURO DA IMUTABILIDADE (Slides 12, 14 e 22)
  const salvarArtigo = (e) => {
    // [ESCREVA AQUI]: Intercepte e evite o recarregamento padrão do formulário
    e.preventDefault()
    if (!novoTitulo.trim()) return;
    const novoArtigoObj = {
      id: Date.now(),
      title: novoTitulo  // Descomente esta linha apos criar o estado do titulo

    };

    setArticle([novoArtigoObj])    
    setTitle('')
    
  };

  return (
    <div className="min-h-screen bg-[#0b111e] text-slate-100 p-6 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        
        <header className="flex justify-between items-center bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
          <h1 className="text-purple-400 font-extrabold tracking-wide text-sm">
            Accenture <span className="text-slate-500 font-normal text-xs">Blog</span>
          </h1>
          <nav className="flex gap-2">
            {/* [ESCREVA AQUI]: Configure os botões onClick para mudar o estado 'aba' (Slide 17) */}
            <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              Início
            </button>
            <button className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              Artigos
            </button>
          </nav>
        </header>

        {/* PASSO D: RENDERS CONDICIONAIS E ESTRUTURAS DE INTERFACE */}
        
        {/* [ESCREVA A CONDICIONAL DA TELA INICIAL AQUI] (Slide 17) */}
          <div className="bg-slate-800/10 border border-slate-800 p-8 rounded-xl text-center shadow-md">
            <h2 className="text-base font-bold text-white">Revisão Editorial</h2>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Alterne para a aba de artigos para carregar os fluxos de rede assíncronos.
            </p>
          </div>

        {/* [ESCREVA A CONDICIONAL DA TELA DE ARTIGOS AQUI] (Slide 17) */}
          <div className="space-y-4">
            
            {/* [ESCREVA O BLOCO DO FORMULÁRIO CONTROLADO AQUI associado a função salvarArtigo] (Slide 14) */}

            <div className="bg-slate-800/20 rounded-xl border border-slate-800/60 shadow-lg overflow-hidden">
              <div className="p-3 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feed de Publicações</span>
              </div>

              {/* [ESCREVA A CONDICIONAL DO LOADING AQUI] */}
                <div className="p-8 flex flex-col items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-purple-400 text-[10px] font-mono animate-pulse">Sincronizando com a API...</p>
                </div>

              {/* [ESCREVA A ITERAÇÃO MAP() COM A PROPRIEDADE KEY AQUI] (Slide 5) */}
              
            </div>
          </div>
      </div>
    </div>
  );
}

