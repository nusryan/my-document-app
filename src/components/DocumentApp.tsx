import React from 'react';
import { RecoilRoot } from 'recoil';
import AvailableDocuments from './AvailableDocuments';
import SelectedDocuments from './SelectedDocuments';

const DocumentApp: React.FC = () => {
  return (
    <RecoilRoot>
      <div className="w-full h-full flex items-stretch gap-6">
        <AvailableDocuments />
        <SelectedDocuments />
      </div>
    </RecoilRoot>
  );
};

export default DocumentApp;
