import React, { useState } from 'react';
import Section from './Section';

function TutoriaPageTutora() {
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    files: [],
    deadline: '',
  });

  // Adicionar ou Editar uma seção
  const handleSaveSection = () => {
    if (newSection.title.trim() && newSection.description.trim()) {
      const updatedSections = [...sections];

      if (editingSection !== null) {
        updatedSections[editingSection] = { ...newSection };
      } else {
        updatedSections.push({ ...newSection });
      }

      setSections(updatedSections);
      setNewSection({ title: '', description: '', files: [], deadline: '' });
      setEditingSection(null);
      setIsModalOpen(false);
    }
  };

  // Abrir modal para editar seção
  const handleEditSection = (index) => {
    setEditingSection(index);
    setNewSection(sections[index]);
    setIsModalOpen(true);
  };

  // Upload de arquivos no modal
  const handleFileUpload = (files) => {
    setNewSection((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  // Excluir um arquivo específico de uma seção
  const handleDeleteFile = (sectionIndex, fileIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[
      sectionIndex
    ].files.filter((_, i) => i !== fileIndex);
    setSections(updatedSections);
  };

  // Excluir uma seção
  const handleDeleteSection = (sectionIndex) => {
    setSections(sections.filter((_, index) => index !== sectionIndex));
  };

  return (
    <div className="bg-pink-100 min-h-screen p-8">
      <header className="p-4 bg-customPurple text-white mb-6">
        <h1 className="text-2xl font-bold text-center">
          Gerenciamento de Seções
        </h1>
      </header>

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
            {/* Botões dentro da seção */}
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

        {/* Botão para abrir o modal */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Adicionar Nova Seção
          </button>
        </div>
      </div>

      {/* Modal para Adicionar/Editar Seção */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {editingSection !== null
                ? 'Editar Seção'
                : 'Adicionar Nova Seção'}
            </h2>

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

            <label className="block text-gray-700 font-semibold mb-2">
              Prazo:
            </label>
            <input
              type="date"
              value={newSection.deadline || ''}
              onChange={(e) =>
                setNewSection({ ...newSection, deadline: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block text-gray-700 font-semibold mb-2">
              Arquivos:
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              className="w-full text-sm text-gray-500 mb-4"
            />

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
