import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página Inicial</h1>
      <div>
        {' '}
        <button onClick={() => navigate('/tutoria')}>Ir para a tutoria</button>
      </div>
      <div>
        <button onClick={() => navigate('/adminDashboard')}>
          Ir para o adminDashboard
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/loginAdmin')}>
          Ir para o LoginAdmin
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/loginTutora')}>
          Ir para o LoginTutora
        </button>
      </div>
      <div>
        <button onClick={() => navigate('/loginAluna')}>
          Ir para o LoginAluna
        </button>
      </div>
    </div>
  );
}

export default App;
