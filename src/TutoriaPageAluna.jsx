import Section from './Section';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function TutoriaPageAluna() {
  const [sections] = useState([
    {
      title: '',
      description: '',
      files: [],
    },
  ]);

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
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <Section
            key={sectionIndex}
            title={section.title}
            description={section.description}
            files={section.files}
          />
        ))}
      </div>
    </div>
  );
}

export default TutoriaPageAluna;
