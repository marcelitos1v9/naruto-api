import React from 'react';

const Header = ({ nomeUsuario }) => {
  return (
    <header className="bg-orange-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">NarutoPédia do Marcelo</h1>
        {nomeUsuario && (
          <p className="text-lg font-semibold">
            Bem-vindo, {nomeUsuario}!
          </p>
        )}
      </nav>
    </header>
  );
};

export default Header;
