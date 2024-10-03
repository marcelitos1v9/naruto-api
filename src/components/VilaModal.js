import React, { useState } from 'react';
import PersonagemModal from './PersonagemModal';

const VilaModal = ({ vila, onClose }) => {
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  if (!vila) return null;

  const abrirPersonagem = (personagem) => {
    setPersonagemSelecionado(personagem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-orange-50 rounded-lg max-w-3xl w-full mx-4 shadow-2xl border-4 border-orange-300 flex flex-col max-h-[90vh]">
        <div className="p-6 flex justify-between items-center border-b border-orange-200">
          <h2 className="text-3xl font-bold text-orange-900">{vila.name}</h2>
          <button
            onClick={onClose}
            className="text-orange-600 hover:text-orange-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-orange-800">País:</p>
              <p className="text-orange-700 mb-2">{vila.country || 'Desconhecido'}</p>
              
              <p className="font-semibold text-orange-800">Líder:</p>
              <p className="text-orange-700 mb-2">{vila.leader || 'Desconhecido'}</p>
              
              {vila.population && (
                <>
                  <p className="font-semibold text-orange-800">População:</p>
                  <p className="text-orange-700 mb-2">{vila.population}</p>
                </>
              )}
            </div>
            
            <div>
              {vila.symbol && (
                <>
                  <p className="font-semibold text-orange-800">Símbolo:</p>
                  <img src={vila.symbol} alt={`Símbolo de ${vila.name}`} className="w-24 h-24 object-contain mb-2" />
                </>
              )}
              
              {vila.affiliation && (
                <>
                  <p className="font-semibold text-orange-800">Afiliação:</p>
                  <p className="text-orange-700 mb-2">{vila.affiliation}</p>
                </>
              )}
            </div>
          </div>
          
          {vila.description && (
            <div className="mt-4">
              <p className="font-semibold text-orange-800">Descrição:</p>
              <p className="text-sm text-orange-700">{vila.description}</p>
            </div>
          )}
          
          {vila.characters && vila.characters.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-orange-800 mb-2">Personagens Notáveis:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {vila.characters.map((character) => (
                  <div 
                    key={character.id} 
                    className="bg-orange-100 p-2 rounded cursor-pointer hover:bg-orange-200 transition-colors"
                    onClick={() => abrirPersonagem(character)}
                  >
                    <p className="text-sm text-orange-700">{character.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-orange-200">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors w-full"
          >
            Fechar
          </button>
        </div>
      </div>
      
      {personagemSelecionado && (
        <PersonagemModal 
          personagem={personagemSelecionado} 
          onClose={() => setPersonagemSelecionado(null)} 
        />
      )}
    </div>
  );
};

export default VilaModal;