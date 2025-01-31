import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);
  const [alunas, setAlunas] = useState([]);
  const [tutoras, setTutoras] = useState([]);
  const [selectedAluna, setSelectedAluna] = useState(null);
  const [selectedTutora, setSelectedTutora] = useState(null);

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

  const fetchData = async (type, title, filter) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/${type}`);
      const data = await res.json();
      setContent(
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">{title}</h3>
          {data.filter(filter).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-gray-700">
              <span>{item.nome} - {item.email}</span>
            </div>
          ))}
        </div>
      );
    } catch (err) {
      console.error(err);
      setContent(<p className="text-red-500">Erro ao carregar {title.toLowerCase()}.</p>);
    }
  };

  const aprovarAluna = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/aprovar-aluna/${id}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Aluna aprovada com sucesso!');
        loadAprovacoes();
      } else {
        alert('Erro ao aprovar aluna.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao aprovar aluna. Tente novamente.');
    }
  };

  const negarAluna = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/negar-aluna/${id}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Aluna negada com sucesso!');
        loadAprovacoes();
      } else {
        alert('Erro ao negar aluna.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao negar aluna. Tente novamente.');
    }
  };

  const aprovarTutora = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/aprovar-tutora/${id}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Tutora aprovada com sucesso!');
        loadAprovacoes();
      } else {
        alert('Erro ao aprovar tutora.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao aprovar tutora. Tente novamente.');
    }
  };

  const negarTutora = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admins/negar-tutora/${id}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Tutora negada com sucesso!');
        loadAprovacoes();
      } else {
        alert('Erro ao negar tutora.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao negar tutora. Tente novamente.');
    }
  };

  useEffect(() => {
    const fetchAlunas = async () => {
      const res = await fetch('http://localhost:5000/api/admins/alunas');
      const data = await res.json();
      setAlunas(data);
    };

    const fetchTutoras = async () => {
      const res = await fetch('http://localhost:5000/api/admins/tutoras');
      const data = await res.json();
      setTutoras(data);
    };

    fetchAlunas();
    fetchTutoras();
  }, []);

  const associarTutora = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admins/associar-tutora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alunaId: selectedAluna, tutoraId: selectedTutora }),
      });

      const response = await res.json();
      if (res.ok) {
        alert('Tutora associada à aluna com sucesso!');
      } else {
        alert(response.message || 'Erro ao associar tutora.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao associar tutora. Tente novamente.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-200 shadow-md rounded">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Cadastros</h2>
      <div className="flex space-x-4 mb-6 justify-center">
        <button
          className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-customOrange"
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Associar Tutora a Aluna</h3>
        <div className="flex space-x-4 mt-4">
          <select
            value={selectedAluna}
            onChange={(e) => setSelectedAluna(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione uma Aluna</option>
            {alunas.map((aluna) => (
              <option key={aluna.id} value={aluna.id}>
                {aluna.nome}
              </option>
            ))}
          </select>
          <select
            value={selectedTutora}
            onChange={(e) => setSelectedTutora(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione uma Tutora</option>
            {tutoras.map((tutora) => (
              <option key={tutora.id} value={tutora.id}>
                {tutora.nome}
              </option>
            ))}
          </select>
          <button
            onClick={associarTutora}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Associar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;