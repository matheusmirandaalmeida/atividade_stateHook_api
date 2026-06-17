//Membros de desenvolvimento para essa Branch: Catarine, Camile

import React, { useState, useEffect } from 'react';

export default function IndexadorEquipe() {

    // PASSO A: CONECTAR OS MOTORES REATIVOS
    // [ESCREVA AQUI]: 1. Crie o useState da aba de navegação (Slide 17)
    const [aba, setAba] = useState("inicio");
    // [ESCREVA AQUI]: 2. Crie o useState de membros (Slide 29)
    const [membros, setMembros] = useState([]);
    // [ESCREVA AQUI]: 3. Crie o useState de carregando (Slide 29)
    const [carregando, setCarregando] = useState(true);
    // [ESCREVA AQUI]: 4. Crie o useState de texto para o input controlado (Slide 14)
    const [novoNome, setNovoNome] = useState("");



    // PASSO B: ORQUESTRAÇÃO ASSÍNCRONA DA API (Slides 27, 28 e 29)
    useEffect(() => {
        (async () => {
            try {
                // [ESCREVA AQUI]: Ative o estado de carregamento para true
                setCarregando(true);
                // [ESCREVA AQUI]: Faça o fetch assíncrono para https://jsonplaceholder.typicode.com/users
                const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
                // [ESCREVA AQUI]: Converta a resposta obtida para JSON
                const dados = await resposta.json();
                // [ESCREVA AQUI]: Guarde o array convertido no estado de membros
                setMembros(dados);

            } catch (err) {
                console.error("Erro ao sincronizar com a API externa", err);
            } finally {
                // [ESCREVA AQUI]: Desative o estado de carregamento para false
                setCarregando(false);
            }
        })();
    }, []); // Array vazio executa apenas no mount físico

    // PASSO C: A REGRA DE OURO DA IMUTABILIDADE (Slides 12, 14 e 22)
    const salvarMembro = (e) => {
        // [ESCREVA AQUI]: Intercepte e evite o recarregamento padrão do formulário
        e.preventDefault();

        if (!novoNome.trim()) return; // Descomente esta linha apos criar o estado do nome

        const novoMembroObj = {
            id: Date.now(),
            name: novoNome // Descomente esta linha apos criar o estado do nome
        };

        // [ESCREVA AQUI]: Atualize o estado de membros inserindo o novo objeto no TOPO da lista via spread [...]
        // setMembros([novoMembroObj, ...membros]);
        setMembros((membrosAnteriores) => [
            novoMembroObj,
            ...membrosAnteriores
        ]);

        // [ESCREVA AQUI]: Resete o estado do input para string vazia
        setNovoNome("");
    };

    return (
        <div className="min-h-screen bg-[#0b111e] text-slate-100 p-6 font-sans">
            <div className="max-w-md mx-auto space-y-6">

                <header className="flex justify-between items-center bg-[#111827] p-4 rounded-xl border border-slate-800 shadow-md">
                    <h1 className="text-purple-400 font-extrabold tracking-wide text-sm">
                        Accenture <span className="text-slate-500 font-normal text-xs">RH</span>
                    </h1>
                    <nav className="flex gap-2">
                        {/* [ESCREVA AQUI]: Configure os botões onClick para mudar o estado 'aba' (Slide 17) */}
                        <button onClick={() => setAba("inicio")} className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                            Início
                        </button>
                        <button onClick={() => setAba("equipe")} className="px-3 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                            Equipe
                        </button>
                    </nav>
                </header>

                {/* PASSO D: RENDERS CONDICIONAIS E ESTRUTURAS DE INTERFACE */}

                {/* [ESCREVA A CONDICIONAL DA TELA INICIAL AQUI] (Slide 17) */
                    aba === "inicio" && (
                        <div className="bg-slate-800/10 border border-slate-800 p-8 rounded-xl text-center shadow-md">
                            <h2 className="text-base font-bold text-white">Quadro de Talentos</h2>
                            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                                Alterne para a aba de equipe para carregar os fluxos de rede assíncronos.
                            </p>
                        </div>)
                }

                {/* [ESCREVA A CONDICIONAL DA TELA DE EQUIPE AQUI] (Slide 17) */
                    aba === "equipe" && (
                        <div className="space-y-4">

                            {/* [ESCREVA O BLOCO DO FORMULÁRIO CONTROLADO AQUI associado a função salvarMembro] (Slide 14) */}
                            <form onSubmit={salvarMembro} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Novo colaborador"
                                    value={novoNome}
                                    onChange={(e) => setNovoNome(e.target.value)}
                                    className="flex-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                />

                                <button type="submit" className="bg-purple-600 px-4 rounded-lg hover:bg-purple-700">
                                    Adicionar
                                </button>
                            </form>


                            <div className="bg-slate-800/20 rounded-xl border border-slate-800/60 shadow-lg overflow-hidden">
                                <div className="p-3 border-b border-slate-800 bg-slate-800/10 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quadro de Engenharia</span>
                                </div>

                                {/* [ESCREVA A CONDICIONAL DO LOADING AQUI] */
                                    carregando && (
                                        <div className="p-8 flex flex-col items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-purple-400 text-[10px] font-mono animate-pulse">Sincronizando com a API...</p>
                                        </div>

                                    )

                                }


                                {/* [ESCREVA A ITERAÇÃO MAP() COM A PROPRIEDADE KEY AQUI] (Slide 5) */
                                    !carregando && membros
                                        .slice(0, 5)
                                        .map((membro) => (
                                            <div key={membro.id} className="p-3 border-b border-slate-800">
                                                <b>Nome:</b> {membro.name}
                                            </div>
                                        ))
                                }

                            </div>

                        </div>)
                }

            </div>
        </div>
    );
}