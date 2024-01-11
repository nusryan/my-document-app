import { atom } from 'recoil';
import data from './data.json';
import { Document } from './types';

export const availableDocumentsState = atom<Document[]>({
  key: 'availableDocumentsState',
  default: data
});

export const selectedDocumentsState = atom<Document[]>({
  key: 'selectedDocumentsState',
  default: []
});
