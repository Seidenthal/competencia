import Section from './Section';
import { Link } from 'react-router-dom';

function TutoriaPage() {
  const sections = [
    { title: 'Seção 1', content: 'Conteúdo da Seção 1' },
    { title: 'Seção 2', content: 'Conteúdo da Seção 2' },
    { title: 'Seção 3', content: 'Conteúdo da Seção 3' },
  ];

  return (
    <div className="bg-pink-100 min-h-screen">
      <header className="flex justify-between items-center p-0 bg-customPurple">
        <div className="logo ml-28 mb-3">
          <img src="/imagens/logo.png" alt="Logo" className="h-36" />
        </div>
        <nav>
          <ul className="flex list-none m-0 p-0 mr-28">
            <li className="ml-5">
              <Link
                to="/"
                className="text-lg text-white no-underline p-2 hover:bg-customOrange transition duration-300"
              >
                Página Inicial
              </Link>
            </li>
            <li className="ml-5">
              <Link
                to="/sobre"
                className="text-lg text-white no-underline p-2 hover:bg-customOrange transition duration-300"
              >
                Sobre Nós
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <ul className="space-y-4 p-8">
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TutoriaPage;
