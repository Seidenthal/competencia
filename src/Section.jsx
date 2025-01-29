import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

const Section = ({
  title,
  description,
  files,
  deadline,
  onDeleteFile,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-white rounded-md p-4 shadow-md">
      <div className="flex flex-row justify-between items-center">
        <button onClick={toggleExpand} className="text-gray-700">
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        <span className="text-lg font-bold text-gray-800">{title}</span>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">{description}</p>

          {deadline && (
            <p className="text-red-500 text-sm">
              Prazo: {new Date(deadline).toLocaleDateString('pt-BR')}
            </p>
          )}

          {/* Lista de Arquivos */}
          <div>
            <h4 className="text-md font-semibold">Arquivos:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
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
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Exibir botões SOMENTE quando a seção está expandida */}
          <div className="mt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  deadline: PropTypes.string,
  onDeleteFile: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Section;
