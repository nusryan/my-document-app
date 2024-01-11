import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { availableDocumentsState, selectedDocumentsState } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Document } from '../types';

const SelectedDocuments: React.FC = () => {
  const [selectedDocuments, setSelectedDocuments] = useRecoilState(
    selectedDocumentsState
  );
  
  const [availableDocuments, setAvailableDocuments] = useRecoilState(
    availableDocumentsState
  )
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDocumentUnselect = (document: Document) => {
    // Remove the document from selected documents
    setSelectedDocuments(prev => prev.filter(d => d.id !== document.id));

    // Add the document to available document
    setAvailableDocuments([...availableDocuments, document]);
  };
  
  // Filter documents based on search term
  const filteredDocuments = selectedDocuments.filter(document =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/2 p-4 bg-white rounded-lg flex flex-col border border-gray-200">
      <div className="mb-4">
        <h2 className="font-medium mb-2">Selected documents</h2>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative w-full">
          <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="rounded-lg border pl-8 pr-2 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow">
        {filteredDocuments.length == 0 && (
          <div className="bg-gray-200 p-10 flex flex-col items-center rounded-lg min-h-full">
            <FontAwesomeIcon icon={faArrowLeft} className="text-7xl p-10 text-gray-400" />
            <p>Select documents from the left panel to have employees review them and provide a signature acknowledging review</p>  
          </div>
        )}
        
        {filteredDocuments.length > 0 && (
          <div className="border px-4 border-green-600 rounded-lg">
            {filteredDocuments.map(document => (
              <div key={document.id} className="my-5 flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-600 pr-4" />
                <span className="text-sm font-medium">{document.name}</span>
                <button onClick={() => handleDocumentUnselect(document)} className="px-2 py-0 ml-auto border border-gray-300 bg-white rounded-md">
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            ))}
          </div>  
        )}
        
      </div>
    </div>
  );
};

export default SelectedDocuments;
