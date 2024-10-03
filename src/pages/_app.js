import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ModalEntrada from '../components/ModalEntrada';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [mostrarModal, setMostrarModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const nomeArmazenado = localStorage.getItem('nomeUsuario');
    if (nomeArmazenado) {
      setNomeUsuario(nomeArmazenado);
    }
  }, []);

  const handleCloseModal = (nome) => {
    setNomeUsuario(nome);
    setMostrarModal(false);
  };

  useEffect(() => {
    console.log('Rota atual:', router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Header nomeUsuario={nomeUsuario} />
      <Component {...pageProps} />
      {mostrarModal && <ModalEntrada onClose={handleCloseModal} />}
    </>
  );
}

export default MyApp;
