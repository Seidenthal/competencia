import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Section = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-purple-500 rounded-md p-2 text-white">
      <div className="flex flex-row justify-between w-1/2">
        <button
          className=""
          onClick={toggleExpand}
          style={{ cursor: 'pointer' }}
        >
          {' '}
          {isExpanded ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
        </button>
        <div className="">
          {' '}
          <span className="text-center">{title}</span>
        </div>
      </div>

      {isExpanded && <p className="flex-row text-left">{content}</p>}
    </div>
  );
};
Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Section;
