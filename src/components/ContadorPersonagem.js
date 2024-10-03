import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonagemModal from './PersonagemModal';

const ContadorPersonagem = () => {
  const [contador, setContador] = useState(1);
  const [personagem, setPersonagem] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarPersonagem();
  }, [contador]);

  const buscarPersonagem = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await axios.get(`https://narutodb.xyz/api/character/${contador}`);
      setPersonagem(resposta.data);
    } catch (error) {
      setErro('Personagem não encontrado');
      setPersonagem(null);
    } finally {
      setCarregando(false);
    }
  };

  const incrementar = () => setContador(prev => prev + 1);
  const decrementar = () => setContador(prev => Math.max(1, prev - 1));
  const dobrar = () => setContador(prev => prev * 2);
  const resetar = () => setContador(1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-900">Contador de Personagens</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={decrementar} className="bg-orange-500 text-white px-4 py-2 rounded">Decrementar</button>
        <button onClick={incrementar} className="bg-orange-500 text-white px-4 py-2 rounded">Incrementar</button>
        <button onClick={dobrar} className="bg-orange-500 text-white px-4 py-2 rounded">Dobrar</button>
        <button onClick={resetar} className="bg-orange-500 text-white px-4 py-2 rounded">Resetar</button>
      </div>
      <p className="text-center text-2xl font-bold text-orange-800 mb-4">ID do Personagem: {contador}</p>
      
      {carregando && <p className="text-center text-orange-800">Carregando...</p>}
      {erro && <p className="text-center text-red-600">{erro}</p>}
      
      {personagem && (
        <div className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-orange-900">{personagem.name}</h2>
          {personagem.images && personagem.images.length > 0 && (
            <img src={personagem.images[0]} alt={personagem.name} className="w-full h-48 object-cover rounded-lg mb-2" />
          )}
          <div className="mb-2">
            <p className="font-semibold text-orange-800">Aldeia:</p>
            <p className="text-orange-700">{personagem.personal?.affiliation || 'Desconhecida'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContadorPersonagem;