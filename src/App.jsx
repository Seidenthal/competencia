import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
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
            <li className="ml-5">
              <Link
                to="/loginAdmin"
                className="text-lg text-white no-underline p-2 hover:bg-customOrange transition duration-300"
              >
                Administração
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative h-screen flex flex-col justify-center items-center text-center text-white p-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-100 z-[-1] bg-black brightness-25"
          style={{ backgroundImage: "url('/imagens/Fundo.jpeg')" }}
        ></div>
        <div className="z-10 text-customPurple">
          <h1 className="text-6xl mb-8 text-white font-bold">
            Meninas Digitais
          </h1>
          <p className="text-lg leading-relaxed mb-16 mx-8 text-white">
            O projeto Meninas Digitais – UTFPR-CP visa contribuir para o aumento
            da participação de meninas e mulheres em computação e STEM (sigla em
            inglês para ciência, tecnologia, engenharia e matemática),
            incentivando e auxiliando meninas estudantes de ensino fundamental e
            médio de Cornélio Procópio a seguirem carreira nessas áreas.
          </p>
          <div className="flex gap-5 justify-center">
            <div className="bg-white p-10 rounded-lg w-96 text-center">
              <div className="bg-customPurple rounded-full p-8 mb-12 mx-auto w-44 h-44">
                <img
                  src="/imagens/Icone1.png"
                  alt="Icon 1"
                  className="w-full h-full"
                />
              </div>
              <h3 className="mb-2  text-3xl font-bold">Alunas</h3>
              <p className="mb-5 text-black">
                Deseja participar do projeto? Cadastre-se.
              </p>
              <Link
                to="/loginAluna"
                className="text-black no-underline border border-black p-2 rounded hover:bg-white transition duration-300"
              >
                Saiba Mais
              </Link>
            </div>
            <div className="bg-white p-10 rounded-lg w-96 text-center">
              <div className="bg-customPurple rounded-full p-8 mb-12 mx-auto w-44 h-44">
                <img
                  src="/imagens/Icone2.png"
                  alt="Icon 2"
                  className="w-full h-full"
                />
              </div>
              <h3 className="mb-2 text-3xl font-bold">Tutores</h3>
              <p className="mb-5 text-black">Área dos Tutores.</p>
              <Link
                to="/loginTutora"
                className="text-black no-underline border border-black p-2 rounded hover:bg-white transition duration-300"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-customOrange text-white text-center p-8 w-full">
        <p>
          Desenvolvido por: Igor Gustavo Mainardes, Daniel Seidenthal, Vinicius
          Henrique Cerrone
        </p>
      </footer>
    </div>
  );
};

export default App;
