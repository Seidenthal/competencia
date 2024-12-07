import { useState } from 'react';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);

  const fetchData = async (endpoint, title, filterFn) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/${endpoint}`);
      const data = await res.json();
      const filteredData = data.filter(filterFn);
      setContent(
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {filteredData.map((item, index) => (
            <p key={index} className="text-gray-700">
              {item.nome} - {item.email}
            </p>
          ))}
        </div>,
      );
    } catch (err) {
      console.error(err);
      setContent(<p className="text-red-500">Erro ao carregar os dados.</p>);
    }
  };

  const loadAprovacoes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admins/aprovacoes');
      const { tutoras, alunas } = await res.json();
      setContent(
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Pedidos de Aprovação</h3>
          <div>
            <h4 className="text-md font-semibold">Tutoras</h4>
            {tutoras.map((tutora) => (
              <div
                key={tutora.id}
                className="flex items-center justify-between text-gray-700"
              >
                <span>
                  {tutora.nome} - {tutora.email}
                </span>
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => aprovarTutora(tutora.id)}
                  >
                    Aprovar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => negarTutora(tutora.id)}
                  >
                    Negar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-md font-semibold">Alunas</h4>
            {alunas.map((aluna) => (
              <div
                key={aluna.id}
                className="flex items-center justify-between text-gray-700"
              >
                <span>
                  {aluna.nome} - {aluna.email}
                </span>
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => aprovarAluna(aluna.id)}
                  >
                    Aprovar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => negarAluna(aluna.id)}
                  >
                    Negar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>,
      );
    } catch (err) {
      console.error(err);
      setContent(<p className="text-red-500">Erro ao carregar aprovações.</p>);
    }
  };

  const aprovarTutora = async (id) =>
    await handleApproval('aprovar-tutora', id);
  const negarTutora = async (id) => await handleApproval('negar-tutora', id);
  const aprovarAluna = async (id) => await handleApproval('aprovar-aluna', id);
  const negarAluna = async (id) => await handleApproval('negar-aluna', id);

  const handleApproval = async (endpoint, id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admins/${endpoint}/${id}`,
        {
          method: 'POST',
        },
      );
      const data = await res.json();
      console.log(data);
      loadAprovacoes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-200 shadow-md rounded">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Cadastros</h2>
      <div className="flex space-x-4 mb-6 justify-center">
        <button
          className="bg-blue-500  font-bold text-white px-4 py-2 rounded hover:bg-customOrange" 
          onClick={() =>
            fetchData('tutoras', 'Tutoras', (item) => item.aprovado)
          }
        >
          Tutoras
        </button>
        <button
          className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-customOrange"
          onClick={() => fetchData('alunas', 'Alunas', (item) => item.aprovado)}
        >
          Alunas
        </button>
        <button
          className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-customOrange"
          onClick={loadAprovacoes}
        >
          Ver Aprovações
        </button>
      </div>
      <div className="border-t pt-4">{content}</div>
    </div>
  );
};

export default AdminDashboard;
