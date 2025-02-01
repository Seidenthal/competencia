import { useState } from 'react';
import Calendar from './Calendar';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function EncontrosAluna() {
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
    <div className="bg-pink-100 min-h-screen p-8 space-y-8">
      <header className="flex justify-between items-center w-full p-4 bg-customPurple rounded-xl">
        <div className="ml-10">
          <img src="/imagens/logo.png" alt="Logo" className="h-36" />
        </div>
        <nav className="mr-10">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/homePageAluna"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Página Inicial
              </Link>
            </li>
            <li>
              <Link
                to="/tutoriaPageAluna"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Tutoria
              </Link>
            </li>
          </ul>
        </nav>
      </header>

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
    </div>
  );
}

export default EncontrosAluna;
