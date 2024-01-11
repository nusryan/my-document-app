import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { availableDocumentsState, selectedDocumentsState } from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faArrowRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import FilterSection from './FilterSection';
import { Document } from '../types';

const groupDocuments = (
  documents: Document[],
  key: keyof Document
) => {
  const groups: { [key: string]: Document[] } = {};
  
  documents.forEach(document => {
    const groupKey = document[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(document);
  });
  return groups;
};

const AvailableDocuments: React.FC = () => {
  const [availableDocuments, setAvailableDocuments] = useRecoilState(
    availableDocumentsState
  );
  
  const [selectedDocuments, setSelectedDocuments] = useRecoilState(
    selectedDocumentsState
  );
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [expandedGroupId, setExpandGroupId] = useState<string>();

  const toggleGroup = (groupId: string) => {
    if (groupId == expandedGroupId){
      setExpandGroupId('');
    } else {
      setExpandGroupId(groupId)
    }
  };

  
  // Filter documents based on search term
  const filteredDocuments = availableDocuments.filter(document =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const groupedDocuments = groupDocuments(filteredDocuments, 'group');

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Move all available documents to selected documents
      setSelectedDocuments(prev => [...prev, ...availableDocuments]);

      // Clear available documents
      setAvailableDocuments([]);  
    } else {
      // Move all selected documents to available documents
      setAvailableDocuments(prev => [...prev, ...selectedDocuments]);

      // Clear selected documents
      setSelectedDocuments([]);  
    }
  };

  const handleMoveToSelected = (document: Document) => {
    // Remove the document from availableDocuments
    setAvailableDocuments(prev => prev.filter(d => d.id !== document.id));

    // Add the document to selectedDocuments
    setSelectedDocuments([...selectedDocuments, document]);
  };

  return (
    <div className="w-1/2 p-4  bg-white rounded-lg border border-gray-200">
      <h2 className="font-medium mb-4">Available documents</h2>
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
      <div className="mb-4">
        <FilterSection />
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="mr-2 text-sm font-medium">{filteredDocuments.length} Available Documents</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={handleSelectAll} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Select All</span>
          </label>
          
      </div>
      <div className="border border-red-500 rounded-lg overflow-hidden">
        {Object.entries(groupedDocuments).length == 0 && (
          <p className="p-5 text-lg">No documents</p>
        )}
        
        {Object.entries(groupedDocuments).sort().map(([group, documents]) => (
          <div key={group} className="border-b-gray-300 border-b">
            <div
              className={`font-medium flex items-center cursor-pointer p-4 ${expandedGroupId == group ? 'bg-gray-100 border-b border-b-gray-200 text-gray-900' : 'bg-gray-50 text-gray-600'}`}
              onClick={() => toggleGroup(group)}
            >
              
              <span className="flex-grow">{group}</span>
              <FontAwesomeIcon
                icon={expandedGroupId == group ? faAngleUp : faAngleDown}
                className="text-gray-500 mr-2"
              />
            </div>

            <div className={`ml-4 transition-all duration-300 ${expandedGroupId == group ? 'block' : 'hidden'}`}>
              {documents.map(groupDocument => (
                <div key={groupDocument.id} className="flex items-center my-5 pr-4">
                  <div className="text-sm font-medium text-gray-900">{groupDocument.name}</div>
                  <button onClick={() => handleMoveToSelected(groupDocument)} className="rounded-md px-2 py-0 bg-white border-gray-200 ml-auto">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-gray-500 text-sm"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDocuments;
