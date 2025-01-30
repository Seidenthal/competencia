import { useState } from 'react';
import Calendar from './Calendar';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';

function EncontrosAluna() {
  const [encontros, setEncontros] = useState([]);

  // Filtra apenas os encontros futuros para exibição na lista
  const encontrosFuturos = encontros.filter(
    (encontro) => isBefore(new Date(), startOfDay(new Date(encontro.date))), // Apenas os encontros a partir de hoje
  );

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <header className="p-4 bg-customPurple text-white">
        <h1 className="text-2xl font-bold text-center">Meus Encontros</h1>
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
