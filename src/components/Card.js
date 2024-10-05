import React from "react";

const Card = ({ personagem, onClick }) => {
  return (
    <div
      className="bg-orange-100 shadow-md rounded-lg p-4 border-2 border-orange-300 cursor-pointer hover:bg-orange-200 transition-colors"
      onClick={onClick} // Chama a função onClick ao clicar no card
    >
      <h2 className="text-xl font-semibold mb-2 text-orange-900">
        {personagem.name}
      </h2>
      {personagem.images && personagem.images.length > 0 && (
        <img
          src={personagem.images[0]} // Exibe a primeira imagem do personagem
          alt={personagem.name}
          className="w-full h-48 object-cover mb-2 rounded" // Estilização da imagem
        />
      )}
      <div className="mb-2">
        <p className="font-semibold text-orange-800">Status:</p>
        <p className="text-orange-700">{personagem.personal?.status || "Desconhecido"}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold text-orange-800">Classificação:</p>
        <p className="text-orange-700">
          {Array.isArray(personagem.personal?.classification) && personagem.personal.classification.length > 0
            ? personagem.personal.classification.join(", ")
            : "Desconhecido"}
        </p>
      </div>
      <div className="mb-2">
        <p className="font-semibold text-orange-800">Natureza do Chakra:</p>
        <p className="text-orange-700">
          {Array.isArray(personagem.natureType) && personagem.natureType.length > 0
            ? personagem.natureType.join(", ")
            : "Desconhecido"}
        </p>
      </div>
    </div>
  );
};

export default Card;
