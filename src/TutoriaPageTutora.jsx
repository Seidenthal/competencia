import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/sections');
        const data = await res.json();
        setSections(data);
      } catch (err) {
        console.error('Erro ao buscar seções:', err);
      }
    };

    fetchSections();
  }, []);

  const handleSaveSection = async () => {
    if (newSection.title.trim() && newSection.description.trim()) {
      try {
        let updatedSections = [...sections];

        const formData = new FormData();
        formData.append('title', newSection.title);
        formData.append('description', newSection.description);
        formData.append('deadline', newSection.deadline);
        newSection.files.forEach((file) => {
          formData.append('files', file);
        });

        if (editingSection !== null) {
          const res = await fetch(`http://localhost:5000/api/sections/update/${sections[editingSection].id}`, {
            method: 'PUT',
            body: formData,
          });
          const updatedSection = await res.json();
          updatedSections[editingSection] = updatedSection;
        } else {
          const res = await fetch('http://localhost:5000/api/sections/add', {
            method: 'POST',
            body: formData,
          });
          const addedSection = await res.json();
          updatedSections.push(addedSection);
        }

        setSections(updatedSections);
        setNewSection({ title: '', description: '', files: [], deadline: '' });
        setEditingSection(null);
        setIsModalOpen(false);
      } catch (err) {
        console.error('Erro ao salvar seção:', err);
      }
    }
  };

  const handleEditSection = (index) => {
    setEditingSection(index);
    setNewSection(sections[index]);
    setIsModalOpen(true);
  };

  const handleFileUpload = (files) => {
    setNewSection((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  const handleDeleteFile = (sectionIndex, fileIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[sectionIndex].files.filter((_, i) => i !== fileIndex);
    setSections(updatedSections);
  };

  const handleDeleteSection = async (sectionIndex) => {
    try {
      const sectionId = sections[sectionIndex].id;
      await fetch(`http://localhost:5000/api/sections/delete/${sectionId}`, {
        method: 'DELETE',
      });
      setSections(sections.filter((_, index) => index !== sectionIndex));
    } catch (err) {
      console.error('Erro ao excluir seção:', err);
    }
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

        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Adicionar Nova Seção
          </button>
        </div>
      </div>

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
              value={newSection.deadline ? newSection.deadline.split('T')[0] : ''}
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