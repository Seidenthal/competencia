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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const eventos = [
    { date: '2025-02-15', time: '10:00', topic: 'Workshop de Programação' },
    { date: '2025-02-20', time: '14:00', topic: 'Mentoria Técnica' },
  ];

  return (
    <div className="flex flex-col items-center bg-pink-300 min-h-screen">
      <header className="w-full bg-white py-4 shadow-md flex justify-between items-center px-8">
        <img src="/imagens/logo.png" alt="Meninas Digitais" className="h-12" />
        <div>
          <Link to="/sobre" className="mr-4 text-blue-500 hover:underline">Sobre</Link>
          <Link to="/minhaConta" className="text-blue-500 hover:underline">Conta</Link>
        </div>
      </header>

      <div className="w-full max-w-4xl mt-6">
        <img src={images[currentImage]} alt="Banner" className="w-full rounded shadow-md" />
      </div>

      <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow-md">
        <Calendar events={eventos} />
      </div>

      <div className="mt-4 flex gap-4">
        <Link to="/atividades" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-customOrange">Atividades</Link>
        <Link to="/proximos-encontros" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-customOrange">Próximos Encontros</Link>
      </div>
    </div>
  );
};

export default HomePage;
