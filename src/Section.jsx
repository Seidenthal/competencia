import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Section = ({
  title,
  description,
  files,
  onUpload,
  onDeleteFile,
  onDeleteSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-white rounded-md p-4 shadow-md">
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={toggleExpand}
          style={{ cursor: 'pointer' }}
          className="text-gray-700"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        <span className="text-lg font-bold text-gray-800">{title}</span>
      </div>

      {/* Conteúdo expandido */}
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Descrição */}
          <p className="text-gray-600">{description}</p>

          {/* Lista de Arquivos */}
          <div>
            <h4 className="text-md font-semibold">Arquivos:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {file.name}
                  </a>
                  <button
                    onClick={() => onDeleteFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Upload de Arquivos */}
          <div>
            <input
              type="file"
              multiple
              onChange={(e) => onUpload(Array.from(e.target.files))}
              className="w-full text-sm text-gray-500"
            />
          </div>

          {/* Botão Excluir Seção */}
          <div className="flex justify-end">
            <button
              onClick={onDeleteSection}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Excluir Seção
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpload: PropTypes.func.isRequired,
  onDeleteFile: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
};

export default Section;
