import { useState } from 'react';
import Section from './Section';

function TutoriaPageTutora() {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    files: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Adicionar uma nova seção
  const handleAddSection = () => {
    if (newSection.title.trim() && newSection.description.trim()) {
      setSections([...sections, { ...newSection }]);
      setNewSection({ title: '', description: '', files: [] });
      setIsModalOpen(false); // Fecha o modal após adicionar a seção
    }
  };

  // Excluir uma seção
  const handleDeleteSection = (sectionIndex) => {
    setSections(sections.filter((_, index) => index !== sectionIndex));
  };

  // Upload de arquivos em uma seção
  const handleFileUpload = (sectionIndex, files) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = [
      ...updatedSections[sectionIndex].files,
      ...files,
    ];
    setSections(updatedSections);
  };

  // Excluir um arquivo específico de uma seção
  const handleDeleteFile = (sectionIndex, fileIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[
      sectionIndex
    ].files.filter((_, i) => i !== fileIndex);
    setSections(updatedSections);
  };

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <header className="p-4 bg-customPurple text-white mb-6">
        <h1 className="text-2xl font-bold text-center">
          Gerenciamento de Seções
        </h1>
      </header>

      {/* Renderização das seções usando o componente Section */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <Section
            key={sectionIndex}
            title={section.title}
            description={section.description}
            files={section.files}
            onUpload={(files) => handleFileUpload(sectionIndex, files)}
            onDeleteFile={(fileIndex) =>
              handleDeleteFile(sectionIndex, fileIndex)
            }
            onDeleteSection={() => handleDeleteSection(sectionIndex)} // Passa a função de exclusão da seção
          />
        ))}

        {/* Botão para abrir o modal, posicionado logo abaixo das seções */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Adicionar Nova Seção
          </button>
        </div>
      </div>

      {/* Modal para adicionar uma nova seção */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Adicionar Nova Seção</h2>
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
            <div className="flex space-x-4">
              <button
                onClick={handleAddSection}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutoriaPageTutora;
