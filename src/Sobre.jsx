
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sobre = () => {
  return (
    <div className="bg-pink-100 min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-purple-700">
        <div className="logo">
          <img src="/imagens/logo.png" alt="Logo" className="h-36" />
        </div>
        <nav>
          <ul className="flex list-none m-0 p-0">
            <li className="ml-5">
              <a href="index.html" className="text-white no-underline p-2 hover:bg-orange-500 transition duration-300">Página Inicial</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex justify-center items-center p-5 flex-grow">
        <section className="flex justify-between items-center max-w-5xl w-full mt-5 mb-10">
          <div className="w-3/5">
            <h1 className="text-3xl mb-5">Sobre Nós</h1>
            <p className="text-lg leading-relaxed mb-5 text-justify">
              O projeto Meninas Digitais – UTFPR-CP visa contribuir para o aumento da participação de meninas e mulheres em computação e STEM (sigla em inglês para ciência, tecnologia, engenharia e matemática), incentivando e auxiliando meninas estudantes de ensino fundamental e médio de Cornélio Procópio a seguirem carreira nessas áreas. Para isso, o projeto tem como estratégia o ensino de temas em computação e STEM voltados à resolução de desafios de sustentabilidade, a partir de oficinas, palestras, minicursos e mesas redondas, com foco em capacitar e estimular o aprendizado de meninas e mulheres nessas áreas, demonstrando como essas podem causar impacto positivo na sociedade. Busca-se, dessa forma, contribuir para a redução da desigualdade de gênero no Campus da universidade, tornando o ambiente mais igualitário, diverso e inclusivo, bem como ampliar as perspectivas de trabalho de meninas e mulheres, auxiliando-as em sua independência a partir da educação de qualidade.
            </p>
            <p className="text-lg leading-relaxed mb-5">
              <i className="fas fa-envelope mr-2"></i> E-mail: <a href="mailto:meninasdigitaisutfprcp@gmail.com" className="hover:underline hover:text-orange-500">meninasdigitaisutfprcp@gmail.com</a>
            </p>
            <p className="text-lg leading-relaxed">
              <i className="fab fa-instagram mr-2"></i> Instagram: <a href="https://www.instagram.com/meninasdigitaisutfprcp/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-500">@meninasdigitaisutfprcp</a>
            </p>
          </div>
          <div className="w-2/5 text-center">
            <img src="/imagens/logo4.jpg" alt="Logo Meninas Digitais" className="max-w-full h-auto" />
          </div>
        </section>
      </main>
      <footer className="bg-orange-500 text-white text-center p-12">
        <p>Desenvolvido por: Igor Gustavo Mainardes, Daniel Seidenthal, Vinicius Henrique Cerrone</p>
      </footer>
    </div>
  );
};

export default Sobre;