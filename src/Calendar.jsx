import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  subMonths,
  addMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) =>
      offset < 0 ? subMonths(prevDate, 1) : addMonths(prevDate, 1),
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-md relative">
      {/* Cabeçalho do calendário */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          ◀ Anterior
        </button>

        <h2 className="text-xl font-bold text-center">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>

        <button
          onClick={() => changeMonth(1)}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          Próximo ▶
        </button>
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {daysInMonth.map((day) => {
          const event = events.find((e) => isSameDay(new Date(e.date), day));

          return (
            <div
              key={day}
              className="border p-2 text-center relative"
              onMouseEnter={() => setHoveredEvent(event)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {format(day, 'dd')}

              {/* Marcar encontros no calendário */}
              {event && (
                <div className="bg-blue-500 text-white text-xs rounded mt-1 p-1">
                  Encontro
                </div>
              )}

              {/* Tooltip ao passar o mouse */}
              {event && hoveredEvent === event && (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-gray-700 text-white text-sm rounded p-2 shadow-md z-50 w-40">
                  <p>
                    <strong>{event.topic}</strong>
                  </p>
                  <p>
                    {format(new Date(event.date), 'dd/MM/yyyy')} às {event.time}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Calendar;
