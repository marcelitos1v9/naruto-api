import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonagemModal from './PersonagemModal';

const Personagens = ({ paginaAtual, setPaginaAtual, totalPaginas }) => {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const personagensPorPagina = 21;

  useEffect(() => {
    const buscarPersonagens = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(`https://narutodb.xyz/api/character?page=${paginaAtual}&limit=${personagensPorPagina}`);
        setPersonagens(resposta.data.characters);
        setCarregando(false);
      } catch (error) {
        setErro('Ocorreu um erro ao carregar os personagens.');
        setCarregando(false);
      }
    };

    buscarPersonagens();
  }, [paginaAtual]);

  if (carregando) return <div className="text-orange-800 font-bold">Carregando...</div>;
  if (erro) return <div className="text-red-600 font-bold">{erro}</div>;

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(prevPagina => prevPagina - 1);
    }
  };

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(prevPagina => prevPagina + 1);
    }
  };

  const abrirDetalhesPersonagem = (personagem) => {
    setPersonagemSelecionado(personagem);
  };

  const getRank = (personagem) => {
    if (!personagem.rank || !personagem.rank.ninjaRank) return 'Desconhecido';
    
    const rank = personagem.rank.ninjaRank;
    if (typeof rank === 'string') return rank;
    
    if (typeof rank === 'object') {
      // Prioridade para Part II, depois Part I, depois qualquer outro valor
      return rank['Part II'] || rank['Part I'] || Object.values(rank)[0] || 'Desconhecido';
    }
    
    return 'Desconhecido';
  };

  const getVillage = (personagem) => {
    return personagem.personal?.affiliation || 'Desconhecida';
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-900">Personagens de Naruto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personagens.map((personagem) => (
          <div 
            key={personagem.id}
            className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
            onClick={() => abrirDetalhesPersonagem(personagem)}
          >
            <h2 className="text-2xl font-semibold mb-2 text-orange-900">{personagem.name}</h2>
            {personagem.images && personagem.images.length > 0 && (
              <img src={personagem.images[0]} alt={personagem.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            )}
            <div className="mb-2">
              <p className="font-semibold text-orange-800">Rank:</p>
              <p className="text-orange-700">{getRank(personagem)}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-orange-800">Aldeia:</p>
              <p className="text-orange-700">{getVillage(personagem)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={paginaAnterior}
          disabled={paginaAtual === 1}
          className="bg-orange-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="mx-4 py-2 text-orange-800 font-semibold">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          onClick={proximaPagina}
          disabled={paginaAtual === totalPaginas}
          className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
      <PersonagemModal personagem={personagemSelecionado} onClose={() => setPersonagemSelecionado(null)} />
    </main>
  );
};

export default Personagens;
