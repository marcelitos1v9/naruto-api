import React from 'react';

const Header = ({ nomeUsuario }) => {
  return (
    <header className="bg-orange-500 text-white p-4">
      <nav className="container mx-auto flex justify-center items-center">
        {nomeUsuario && (
          <p className="text-xl font-semibold">
            Bem-vindo, <span className="text-2xl">{nomeUsuario}</span>!
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
