import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonagemModal from './PersonagemModal';

const AkatsukiMembers = () => {
  const [membros, setMembros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const membrosPorPagina = 9;

  useEffect(() => {
    const buscarMembrosAkatsuki = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(`https://narutodb.xyz/api/akatsuki?page=${paginaAtual}&limit=${membrosPorPagina}`);
        setMembros(resposta.data.akatsuki);
        
        // Verifica se totalAkatsuki existe e é um número válido
        const totalAkatsuki = resposta.data.totalAkatsuki;
        if (totalAkatsuki && !isNaN(totalAkatsuki)) {
          setTotalPaginas(Math.ceil(totalAkatsuki / membrosPorPagina));
        } else {
          setTotalPaginas(1); // Define como 1 se não houver um total válido
        }
        
        setCarregando(false);
      } catch (error) {
        setErro('Ocorreu um erro ao carregar os membros da Akatsuki.');
        setCarregando(false);
      }
    };

    buscarMembrosAkatsuki();
  }, [paginaAtual]);

  if (carregando) return <div className="text-orange-800 font-bold">Carregando...</div>;
  if (erro) return <div className="text-red-600 font-bold">{erro}</div>;

  const abrirDetalhesMembro = (membro) => {
    setMembroSelecionado(membro);
  };

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-900">Membros da Akatsuki</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {membros.map((membro) => (
          <div 
            key={membro.id}
            className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
            onClick={() => abrirDetalhesMembro(membro)}
          >
            <h2 className="text-2xl font-semibold mb-2 text-orange-900">{membro.name}</h2>
            {membro.images && membro.images.length > 0 && (
              <img src={membro.images[0]} alt={membro.name} className="w-full h-48 object-cover rounded-lg mb-2" />
            )}
            <div className="mb-2">
              <p className="font-semibold text-orange-800">Afiliação:</p>
              <p className="text-orange-700">{membro.personal?.affiliation || 'Desconhecida'}</p>
            </div>
          </div>
        ))}
      </div>
      {totalPaginas > 1 && (
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
      )}
      <PersonagemModal personagem={membroSelecionado} onClose={() => setMembroSelecionado(null)} />
    </div>
  );
};

export default AkatsukiMembers;