import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VilaModal from './VilaModal';

const Vilas = () => {
  const [vilas, setVilas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [vilaSelecionada, setVilaSelecionada] = useState(null);
  const vilasPorPagina = 12;

  useEffect(() => {
    const buscarVilas = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(`https://narutodb.xyz/api/village?page=${paginaAtual}&limit=${vilasPorPagina}`);
        setVilas(resposta.data.villages);
        setTotalPaginas(Math.ceil(resposta.data.totalVillages / vilasPorPagina));
        setCarregando(false);
      } catch (error) {
        setErro('Ocorreu um erro ao carregar as vilas.');
        setCarregando(false);
      }
    };

    buscarVilas();
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

  const abrirDetalhesVila = (vila) => {
    setVilaSelecionada(vila);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-900">Vilas Ninja</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vilas.map((vila) => (
          <div 
            key={vila.id} 
            className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
            onClick={() => abrirDetalhesVila(vila)}
          >
            <h2 className="text-2xl font-semibold mb-2 text-orange-900">{vila.name}</h2>
            <div className="mb-2">
              <p className="font-semibold text-orange-800">País:</p>
              <p className="text-orange-700">{vila.country || 'Desconhecido'}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-orange-800">Líder:</p>
              <p className="text-orange-700">{vila.leader || 'Desconhecido'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={paginaAnterior}
          disabled={paginaAtual === 1}
          className="bg-orange-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="mx-4 py-2 text-orange-800 font-semibold">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          onClick={proximaPagina}
          disabled={paginaAtual === totalPaginas}
          className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
      <VilaModal vila={vilaSelecionada} onClose={() => setVilaSelecionada(null)} />
    </main>
  );
};

export default Vilas;