import { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { format, parseISO, isBefore, startOfDay, addDays } from 'date-fns';
import { Link } from 'react-router-dom';

function EncontrosTutora() {
  const [encontros, setEncontros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEncontro, setNewEncontro] = useState({
    date: '',
    time: '',
    topic: '',
  });

  // Obtém o ID da tutora logada do localStorage
  const tutoraId = localStorage.getItem('tutoraId');

  // useEffect para buscar os encontros da tutora ao carregar a página
  useEffect(() => {
    const fetchEncontros = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/encontros/${tutoraId}`,
        );
        const data = await res.json();
        setEncontros(data);
      } catch (err) {
        console.error('Erro ao buscar encontros:', err);
      }
    };

    fetchEncontros();
  }, [tutoraId]);

  // Adicionar um novo encontro
  const handleAddEncontro = async () => {
    if (newEncontro.date && newEncontro.time && newEncontro.topic.trim()) {
      try {
        const selectedDate = new Date(newEncontro.date);

        // Adiciona um dia à data selecionada
        const adjustedDate = addDays(selectedDate, 1);

        // Converte a data ajustada para o formato ISO
        const dateISO = adjustedDate.toISOString();

        const res = await fetch('http://localhost:5000/api/encontros/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...newEncontro, date: dateISO, tutoraId }),
        });
        const addedEncontro = await res.json();
        setEncontros([...encontros, addedEncontro]);
        setNewEncontro({ date: '', time: '', topic: '' });
        setIsModalOpen(false);
      } catch (err) {
        console.error('Erro ao adicionar encontro:', err);
      }
    }
  };

  // Deletar um encontro
  const handleDeleteEncontro = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/encontros/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        // Remove o encontro da lista
        setEncontros(encontros.filter((encontro) => encontro.id !== id));
      } else {
        console.error('Erro ao deletar encontro');
      }
    } catch (err) {
      console.error('Erro ao deletar encontro:', err);
    }
  };

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
                to="/"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Página Inicial
              </Link>
            </li>
            <li>
              <Link
                to="/tutoriaPageTutora"
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
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {format(new Date(encontro.date), 'dd/MM/yyyy')} às{' '}
                    {encontro.time} - {encontro.topic}
                  </span>
                  <button
                    onClick={() => handleDeleteEncontro(encontro.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
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
