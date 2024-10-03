import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Personagens from './Personagens';
import Vilas from './Vilas';

const Home = ({ children }) => {
  const [conteudoAtual, setConteudoAtual] = useState('personagens');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const buscarTotalPaginas = async () => {
      try {
        const resposta = await axios.get('https://narutodb.xyz/api/character');
        setTotalPaginas(Math.ceil(resposta.data.totalCharacters / 20));
      } catch (error) {
        console.error('Erro ao buscar total de páginas:', error);
      }
    };

    buscarTotalPaginas();
  }, []);

  const renderizarConteudo = () => {
    switch (conteudoAtual) {
      case 'personagens':
        return <Personagens paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} totalPaginas={totalPaginas} />;
      case 'vilas':
        return <Vilas />;
      default:
        return <Personagens paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} totalPaginas={totalPaginas} />;
    }
  };

  return (
    <main className="container mx-auto p-4 flex-grow">
      <nav className="mb-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <button
              onClick={() => setConteudoAtual('personagens')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'personagens' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              Personagens
            </button>
          </li>
          <li>
            <button
              onClick={() => setConteudoAtual('vilas')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'vilas' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              Vilas Ninja
            </button>
          </li>
        </ul>
      </nav>

      {renderizarConteudo()}
    </main>
  );
};

export default Home;
