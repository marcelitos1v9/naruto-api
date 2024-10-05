import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonagemModal from "./PersonagemModal";
import Card from "./Card"; // Importando o componente Card

const Personagens = ({ paginaAtual, setPaginaAtual, totalPaginas }) => {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  useEffect(() => {
    const buscarPersonagens = async () => {
      try {
        setCarregando(true);
        const resposta = await axios.get(
          `https://dattebayo-api.onrender.com/characters?page=${paginaAtual}` // Adiciona a página na URL
        );
        console.log(resposta.data.characters); // Verifique a estrutura correta
        setPersonagens(resposta.data.characters); // Ajuste para acessar o array correto
      } catch (error) {
        setErro("Ocorreu um erro ao carregar os personagens.");
      } finally {
        setCarregando(false);
      }
    };

    buscarPersonagens();
  }, [paginaAtual]); // Dependência da página atual

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const abrirModal = (personagem) => {
    setPersonagemSelecionado(personagem); // Define o personagem selecionado
  };

  if (carregando) return <div className="text-orange-800 font-bold">Carregando...</div>;
  if (erro) return <div className="text-red-600 font-bold">{erro}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-900">
        Personagens de Naruto
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(personagens) && personagens.length > 0 ? (
          personagens.map((personagem) => (
            <Card // Usando o componente Card para renderizar cada personagem
              key={personagem.id}
              personagem={personagem}
              onClick={() => abrirModal(personagem)} // Passa a função para abrir o modal
            />
          ))
        ) : (
          <div className="text-red-600 font-bold">Nenhum personagem encontrado.</div>
        )}
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
      <PersonagemModal
        personagem={personagemSelecionado}
        onClose={() => setPersonagemSelecionado(null)}
      />
    </main>
  );
};

export default Personagens;
