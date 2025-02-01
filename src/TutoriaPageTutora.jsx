import { useState, useEffect } from 'react'; // Importa os hooks do React
import Section from './Section'; // Importa o componente Section
import { Link } from 'react-router-dom'; // Importa o componente Link

function TutoriaPageTutora() {
  // Estado para armazenar as seções da tutora
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal
  const [editingSection, setEditingSection] = useState(null); // Controla a edição de uma seção

  // Obtém o ID da tutora logada do localStorage
  const tutoraId = localStorage.getItem('tutoraId');

  // Estado para armazenar os dados da nova seção
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    files: [],
    deadline: '',
    id: tutoraId, // Relaciona a seção com a tutora logada
  });

  // useEffect para buscar as seções da tutora ao carregar a página
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/sections/${tutoraId}`,
        ); // Busca as seções da tutora
        const data = await res.json();
        setSections(data); // Atualiza o estado com os dados recebidos
      } catch (err) {
        console.error('Erro ao buscar seções:', err);
      }
    };

    fetchSections();
  }, [tutoraId]);

  // Função para salvar uma nova seção ou atualizar uma existente
  const handleSaveSection = async () => {
    if (newSection.title.trim() && newSection.description.trim()) {
      try {
        let updatedSections = [...sections];

        // Criação do FormData para envio dos dados
        const formData = new FormData();
        formData.append('title', newSection.title);
        formData.append('description', newSection.description);
        formData.append('deadline', newSection.deadline);
        formData.append('tutoraId', tutoraId);
        newSection.files.forEach((file) => {
          formData.append('files', file);
        });

        if (editingSection !== null) {
          // Atualiza uma seção existente
          const res = await fetch(
            `http://localhost:5000/api/sections/update/${sections[editingSection].id}`,
            {
              method: 'PUT',
              body: formData,
            },
          );
          const updatedSection = await res.json();
          updatedSections[editingSection] = updatedSection;
        } else {
          console.log(formData);
          // Adiciona uma nova seção
          const res = await fetch('http://localhost:5000/api/sections/add', {
            method: 'POST',
            body: formData,
          });
          const addedSection = await res.json();
          updatedSections.push(addedSection);
        }

        setSections(updatedSections); // Atualiza o estado das seções
        setNewSection({
          title: '',
          description: '',
          files: [],
          deadline: '',
          tutoraId: tutoraId,
        }); // Reseta o formulário
        setEditingSection(null);
        setIsModalOpen(false);
      } catch (err) {
        console.error('Erro ao salvar seção:', err);
      }
    }
  };

  // Função para editar uma seção existente
  const handleEditSection = (index) => {
    setEditingSection(index);
    setNewSection(sections[index]);
    setIsModalOpen(true);
  };

  // Função para adicionar arquivos ao estado da seção
  const handleFileUpload = (files) => {
    setNewSection((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  // Função para remover um arquivo de uma seção
  const handleDeleteFile = (sectionIndex, fileIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[
      sectionIndex
    ].files.filter((_, i) => i !== fileIndex);
    setSections(updatedSections);
  };

  // Função para excluir uma seção
  const handleDeleteSection = async (sectionIndex) => {
    try {
      const sectionId = sections[sectionIndex].id;
      await fetch(`http://localhost:5000/api/sections/delete/${sectionId}`, {
        method: 'DELETE',
      });
      setSections(sections.filter((_, index) => index !== sectionIndex)); // Remove a seção excluída do estado
    } catch (err) {
      console.error('Erro ao excluir seção:', err);
    }
  };

  return (
    <div className="bg-pink-100 min-h-screen p-8 space-y-8">
      {/* Cabeçalho */}
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
                to="/encontrosTutora"
                className="text-lg text-white p-2 hover:bg-customOrange transition duration-300"
              >
                Encontros
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Lista de seções */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <Section
            key={sectionIndex}
            title={section.title}
            description={section.description}
            files={section.files}
            deadline={section.deadline}
            onDeleteFile={(fileIndex) =>
              handleDeleteFile(sectionIndex, fileIndex)
            }
          >
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEditSection(sectionIndex)}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteSection(sectionIndex)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </Section>
        ))}

        {/* Botão para adicionar nova seção */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Adicionar Nova Seção
          </button>
        </div>
      </div>

      {/* Modal para adicionar/editar seção */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {editingSection !== null
                ? 'Editar Seção'
                : 'Adicionar Nova Seção'}
            </h2>

            {/* Campos do formulário */}
            <input
              type="text"
              placeholder="Título da Seção"
              value={newSection.title}
              onChange={(e) =>
                setNewSection({ ...newSection, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              placeholder="Descrição da Seção"
              value={newSection.description}
              onChange={(e) =>
                setNewSection({ ...newSection, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            ></textarea>
            <input
              type="date"
              value={
                newSection.deadline ? newSection.deadline.split('T')[0] : ''
              }
              onChange={(e) =>
                setNewSection({ ...newSection, deadline: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              className="w-full text-sm text-gray-500 mb-4"
            />
            {/* Botão para salvar */}
            <button
              onClick={handleSaveSection}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutoriaPageTutora;
