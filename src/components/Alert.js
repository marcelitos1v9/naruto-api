import React from 'react';

const Alert = ({ mensagem, tipo, onClose }) => {
  const corFundo = tipo === 'erro' ? 'bg-red-100' : 'bg-green-100';
  const corTexto = tipo === 'erro' ? 'text-red-700' : 'text-green-700';
  const corBorda = tipo === 'erro' ? 'border-red-400' : 'border-green-400';

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
      <div className={`${corFundo} ${corBorda} border-t-4 rounded-b px-4 py-3 shadow-md max-w-md`} role="alert">
        <div className="flex">
          <div className="py-1">
            <svg className={`fill-current h-6 w-6 ${corTexto} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <p className={`font-bold ${corTexto}`}>{tipo === 'erro' ? 'Erro' : 'Sucesso'}</p>
            <p className={`text-sm ${corTexto}`}>{mensagem}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className={`mt-3 ${corTexto} font-bold py-1 px-2 rounded`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Alert;
