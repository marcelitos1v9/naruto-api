import React, { useState, useEffect } from 'react';

const ModalEntrada = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarModal(true);
    }, 100); // Pequeno atraso para garantir que o modal apareça após a renderização inicial

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim()) {
      localStorage.setItem('nomeUsuario', nome);
      onClose(nome);
    }
  };

  if (!mostrarModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-orange-50 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-900 mb-4">Bem-vindo ao Naruto Fan Site!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full p-2 text-black mb-4 border border-orange-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEntrada;
