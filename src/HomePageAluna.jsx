import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import { format, isBefore, startOfDay } from 'date-fns';

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/imagens/imagemBanner1.jpg',
    '/imagens/imagemBanner2.jpg',
    '/imagens/imagemBanner3.jpg',
    '/imagens/imagemBanner4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [encontros, setEncontros] = useState([]);

  const alunaId = localStorage.getItem('alunaId');

  // useEffect para buscar os encontros da aluna ao carregar a página
  useEffect(() => {
    const fetchEncontros = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/encontros/aluna/${alunaId}`,
        );
        const data = await res.json();
        setEncontros(data);
      } catch (err) {
        console.error('Erro ao buscar encontros:', err);
      }
    };
    fetchEncontros();
  }, [alunaId]);

  // Filtra apenas os encontros futuros para exibição na lista
  const encontrosFuturos = encontros.filter(
    (encontro) => isBefore(new Date(), startOfDay(new Date(encontro.date))), // Apenas os encontros a partir de hoje
  );

  return (
    <div className="flex flex-col items-center bg-pink-300 min-h-screen">
      <header className="flex justify-between items-center w-full p-4 bg-customPurple">
        <div className="ml-10">
          <img src="/imagens/logo.png" alt="Logo" className="h-36" />
        </div>
        <nav className="mr-10">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Página Inicial
              </Link>
            </li>
            <li>
              <Link
                to="/sobre"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Sobre Nós
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Banner de imagens */}
      <div className="w-6/12 mt-6 p-4 rounded-xl max-w-screen-sm">
        <img
          src={images[currentImage]}
          alt="Banner"
          className="w-full h-full object-cover rounded shadow-md"
        />
      </div>

      <div className="space-y-6">
        {/* Calendário */}
        <Calendar events={encontros} />

        {/* Lista de encontros futuros */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-bold">Próximos Encontros</h2>
          {encontrosFuturos.length > 0 ? (
            <ul className="list-disc pl-5">
              {encontrosFuturos.map((encontro, index) => (
                <li key={index}>
                  {format(new Date(encontro.date), 'dd/MM/yyyy')} às{' '}
                  {encontro.time} - {encontro.topic}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum encontro futuro agendado.</p>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="mt-6 flex gap-5 pb-4">
        <Link
          to="/tutoriaPageAluna"
          className="bg-blue-500 text-white py-4 px-7 rounded hover:bg-customOrange"
        >
          Atividades
        </Link>
        <Link
          to="/encontrosAluna"
          className="bg-blue-500 text-white py-4 px-7 rounded hover:bg-customOrange"
        >
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
