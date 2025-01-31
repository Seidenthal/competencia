import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/imagens/imagemBanner1.jpg',
    '/imagens/imagemBanner2.jpg',
    '/imagens/imagemBanner3.jpg',
    '/imagens/imagemBanner4.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const eventos = [
    { date: '2025-02-15', time: '10:00', topic: 'Workshop de Programação' },
    { date: '2025-02-20', time: '14:00', topic: 'Mentoria Técnica' },
  ];

  return (
    <div className="flex flex-col items-center bg-pink-300 min-h-screen">
      <header className="flex justify-between items-center w-full p-4 bg-customPurple">
        <div className="ml-10">
          <img src="/imagens/logo.png" alt="Logo" className="h-36" />
        </div>
        <nav className="mr-10">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg text-white p-2 hover:bg-customOrange transition duration-300">
                Página Inicial
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="text-lg text-white p-2 hover:bg-customOrange transition duration-300">
                Sobre Nós
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Banner de imagens */}
      <div className="w-[750px] h-[400px] mt-6">
        <img src={images[currentImage]} alt="Banner" className="w-full h-full object-cover rounded shadow-md" />
      </div>

      {/* Calendário*/}
      <div className="w-[900px] bg-white p2 rounded shadow-md mt-6">
        <Calendar events={eventos} />
      </div>

      {/* Botões */}
      <div className="mt-6 flex gap-5">
        <Link to="/atividades" className="bg-blue-500 text-white py-4 px-7 rounded hover:bg-customOrange">
          Atividades
        </Link>
        <Link to="/encontrosAluna" className="bg-blue-500 text-white py-4 px-7 rounded hover:bg-customOrange">
          Próximos Encontros
        </Link>
      </div>
      <footer className="bg-customOrange text-white text-center p-8 w-full">
        <p>
          Desenvolvido por: Igor Gustavo Mainardes, Daniel Seidenthal, Vinicius
          Henrique Cerrone
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
