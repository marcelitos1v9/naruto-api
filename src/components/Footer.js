import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer = ({ nome }) => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Sobre Nós</h3>
            <p className="text-sm text-center md:text-left">Projeto criado para demonstrar o conhecimento em React.js, Next.js, Tailwind CSS e Axios.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-orange-500" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-orange-500" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-orange-500" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-2xl hover:text-orange-500" />
              </Link>
            </div>
            <Link href="mailto:contato@narutofansite.com" className="mt-4 flex items-center hover:text-orange-500">
              <FaEnvelope className="mr-2" />
              marceloaugustocge@gmail.com
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Naruto Fan Site. Todos os direitos reservados.</p>
          <p className="mt-2">Criado por {nome}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
