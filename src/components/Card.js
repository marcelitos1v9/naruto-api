import React from 'react';

const Card = ({ personagem }) => {
  return (
    <div className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300">
      <h2 className="text-xl font-semibold mb-2 text-orange-800">{personagem.name}</h2>
      {personagem.images && personagem.images.length > 0 && (
        <img src={personagem.images[0]} alt={personagem.name} className="w-full h-48 object-cover mb-2 rounded" />
      )}
      <p className="text-orange-700"><strong className="text-orange-900">Status:</strong> {personagem.personal.status || 'Desconhecido'}</p>
      <p className="text-orange-700"><strong className="text-orange-900">Classificação:</strong> {personagem.personal.classification || 'Desconhecido'}</p>
      <p className="text-orange-700"><strong className="text-orange-900">Kekkei Genkai:</strong> {personagem.personal.kekkeiGenkai || 'Nenhum'}</p>
      <p className="text-orange-700"><strong className="text-orange-900">Natureza do Chakra:</strong> {personagem.natureType ? personagem.natureType.join(', ') : 'Desconhecido'}</p>
      <p className="text-orange-700"><strong className="text-orange-900">Jutsus:</strong> {personagem.jutsu ? personagem.jutsu.join(', ') : 'Desconhecido'}</p>
      {personagem.personal.jinchūriki && (
        <p className="text-orange-700"><strong className="text-orange-900">Jinchūriki:</strong> {personagem.personal.jinchūriki.join(', ')}</p>
      )}
      {personagem.uniqueTraits && (
        <p className="text-orange-700"><strong className="text-orange-900">Características Únicas:</strong> {personagem.uniqueTraits.join(', ')}</p>
      )}
    </div>
  );
};

export default Card;
