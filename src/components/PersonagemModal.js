import React from 'react';

const PersonagemModal = ({ personagem, onClose }) => {
  if (!personagem) return null;

  const renderInfo = (label, value) => {
    let displayValue = value;
    if (typeof value === 'object' && value !== null) {
      displayValue = Object.values(value).find(v => v !== null && v !== undefined) || 'Desconhecido';
    }
    return (
      <div className="mb-2">
        <p className="font-semibold text-orange-800">{label}:</p>
        <p className="text-orange-700">{displayValue || 'Desconhecido'}</p>
      </div>
    );
  };

  const getRank = (rank) => {
    if (typeof rank === 'string') return rank;
    if (rank && typeof rank === 'object') {
      return rank['Part II'] || rank['Part I'] || Object.values(rank)[0] || 'Desconhecido';
    }
    return 'Desconhecido';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-orange-50 rounded-lg max-w-4xl w-full mx-4 shadow-2xl border-4 border-orange-300 flex flex-col max-h-[90vh]">
        <div className="p-6 flex justify-between items-center border-b border-orange-200">
          <h2 className="text-3xl font-bold text-orange-900">{personagem.name}</h2>
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
              {personagem.images && personagem.images.length > 0 && (
                <img src={personagem.images[0]} alt={personagem.name} className="w-full h-auto object-cover rounded-lg mb-4" />
              )}
              {renderInfo("Clã", personagem.personal?.clan)}
              {renderInfo("Aldeia", personagem.personal?.affiliation)}
              {renderInfo("Status", personagem.personal?.status)}
              {renderInfo("Sexo", personagem.personal?.sex)}
              {renderInfo("Data de Nascimento", personagem.personal?.birthdate)}
              {renderInfo("Tipo Sanguíneo", personagem.personal?.bloodType)}
              {renderInfo("Ocupação", personagem.personal?.occupation)}
            </div>
            
            <div>
              {renderInfo("Rank", getRank(personagem.rank?.ninjaRank))}
              {renderInfo("Afiliação", personagem.personal?.affiliation)}
              {renderInfo("Time", personagem.personal?.team)}
              {renderInfo("Parceiro", personagem.personal?.partner)}
              
              {personagem.jutsu && personagem.jutsu.length > 0 && (
                <>
                  <p className="font-semibold text-orange-800 mt-4">Jutsus:</p>
                  <ul className="list-disc list-inside text-orange-700">
                    {personagem.jutsu.map((jutsu, index) => (
                      <li key={index}>{jutsu}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {personagem.natureType && personagem.natureType.length > 0 && (
                <>
                  <p className="font-semibold text-orange-800 mt-4">Natureza do Chakra:</p>
                  <ul className="list-disc list-inside text-orange-700">
                    {personagem.natureType.map((nature, index) => (
                      <li key={index}>{nature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          
          {personagem.family && Object.keys(personagem.family).length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-orange-800">Família:</p>
              <ul className="list-disc list-inside text-orange-700">
                {Object.entries(personagem.family).map(([relation, name], index) => (
                  <li key={index}>{relation}: {name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {personagem.tools && personagem.tools.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-orange-800">Ferramentas:</p>
              <ul className="list-disc list-inside text-orange-700">
                {personagem.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
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
    </div>
  );
};

export default PersonagemModal;