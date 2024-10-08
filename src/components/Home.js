import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Personagens from './Personagens';
import Vilas from './Vilas';
import AkatsukiMembers from './AkatsukiMembers';
import KaraMembers from './KaraMembers';
import ContadorPersonagem from './ContadorPersonagem';

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
      case 'akatsuki':
        return <AkatsukiMembers />;
      case 'kara':
        return <KaraMembers />;
      case 'contador':
        return <ContadorPersonagem />;
      default:
        return <Personagens paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} totalPaginas={totalPaginas} />;
    }
  };

  return (
    <main className="container mx-auto p-4 flex-grow bg-gray-900 text-white">
      <nav className="mb-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <button
              onClick={() => setConteudoAtual('personagens')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'personagens' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Personagens
            </button>
          </li>
          <li>
            <button
              onClick={() => setConteudoAtual('contador')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'contador' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Contador de Personagens
            </button>
          </li>
          <li>
            <button
              onClick={() => setConteudoAtual('vilas')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'vilas' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Vilas Ninja
            </button>
          </li>
          <li>
            <button
              onClick={() => setConteudoAtual('akatsuki')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'akatsuki' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Akatsuki
            </button>
          </li>
          <li>
            <button
              onClick={() => setConteudoAtual('kara')}
              className={`px-4 py-2 rounded ${conteudoAtual === 'kara' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Kara
            </button>
          </li>
          
        </ul>
      </nav>

      {renderizarConteudo()}
    </main>
  );
};

export default Home;
