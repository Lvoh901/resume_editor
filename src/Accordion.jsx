import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 border border-gray-200 rounded-lg">
      <button 
        className="w-full bg-gray-50 p-4 text-left font-semibold flex justify-between items-center" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen p-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;