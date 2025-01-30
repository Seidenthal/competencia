import { useState } from 'react';
import Calendar from './Calendar';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';

function EncontrosTutora() {
  const [encontros, setEncontros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEncontro, setNewEncontro] = useState({
    date: '',
    time: '',
    topic: '',
  });

  // Adicionar um novo encontro
  const handleAddEncontro = () => {
    if (newEncontro.date && newEncontro.time && newEncontro.topic.trim()) {
      setEncontros([
        ...encontros,
        {
          ...newEncontro,
          date: parseISO(newEncontro.date), // Converte string para Date
        },
      ]);
      setNewEncontro({ date: '', time: '', topic: '' });
      setIsModalOpen(false);
    }
  };

  // Filtra apenas os encontros futuros para exibição na lista
  const encontrosFuturos = encontros.filter(
    (encontro) => isBefore(new Date(), startOfDay(new Date(encontro.date))), // Apenas os encontros a partir de hoje
  );

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <header className="p-4 bg-customPurple text-white">
        <h1 className="text-2xl font-bold text-center">Gerenciar Encontros</h1>
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

        {/* Botão para abrir o modal */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Agendar Novo Encontro
          </button>
        </div>
      </div>

      {/* Modal para criar encontros */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Agendar Novo Encontro</h2>

            <label className="block text-gray-700 font-semibold mb-2">
              Data:
            </label>
            <input
              type="date"
              value={newEncontro.date}
              onChange={(e) =>
                setNewEncontro({ ...newEncontro, date: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block text-gray-700 font-semibold mb-2">
              Horário:
            </label>
            <input
              type="time"
              value={newEncontro.time}
              onChange={(e) =>
                setNewEncontro({ ...newEncontro, time: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block text-gray-700 font-semibold mb-2">
              Tópico:
            </label>
            <input
              type="text"
              value={newEncontro.topic}
              onChange={(e) =>
                setNewEncontro({ ...newEncontro, topic: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex space-x-4">
              <button
                onClick={handleAddEncontro}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EncontrosTutora;
