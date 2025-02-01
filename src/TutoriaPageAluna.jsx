import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from './Section';
import { Link } from 'react-router-dom';

function TutoriaPageAluna() {
  const alunaId = localStorage.getItem('alunaId');
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/sections/aluna/${alunaId}`,
        );
        const data = await res.json();

        if (res.ok) {
          setSections(data);
        } else {
          console.error('Erro ao carregar seções:', data.error);
        }
      } catch (err) {
        console.error('Erro na requisição:', err);
      } finally {
        setLoading(false);
      }
    };

    if (alunaId) {
      fetchSections();
    }
  }, [alunaId]);

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
                to="/encontrosAluna"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Encontros
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Materiais da Tutora
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : sections.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma seção disponível.</p>
        ) : (
          <div className="space-y-8">
            {sections.map((section) => (
              <Section
                key={section.id}
                title={section.title}
                description={section.description}
                deadline={section.deadline}
                files={section.files}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TutoriaPageAluna;
