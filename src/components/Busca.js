import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Alert from './Alert';

const Busca = ({ termoBusca }) => {
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const realizarBusca = async () => {
      if (!termoBusca) {
        setResultado(null);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        const nomeCompleto = termoBusca.split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');
        const resposta = await axios.get(`https://narutodb.xyz/api/character/search?name=${nomeCompleto}`);
        if (resposta.data.length > 0) {
          setResultado(resposta.data[0]);
        } else {
          setResultado(null);
        }
        setCarregando(false);
        setErro(null);
      } catch (error) {
        console.error('Erro na busca:', error);
        setErro('Ocorreu um erro ao buscar o personagem. Por favor, tente novamente mais tarde.');
        setCarregando(false);
        setResultado(null);
      }
    };

    realizarBusca();
  }, [termoBusca]);

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Resultado da busca para: {termoBusca}</h2>
      {erro ? (
        <Alert mensagem={erro} tipo="erro" onClose={() => setErro(null)} />
      ) : resultado ? (
        <Card personagem={resultado} />
      ) : (
        <p>Nenhum personagem encontrado.</p>
      )}
    </div>
  );
};

export default Busca;
