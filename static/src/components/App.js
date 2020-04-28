import React from 'react';

import Home from './pages/Home';

import DocumentsState from '../context/documents/DocumentsState';
import DirectorsState from '../context/directors/DirectorsState';

import './App.less';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const App = () => {
  return (
    <DocumentsState>
      <DirectorsState>
        <Home />
      </DirectorsState>
    </DocumentsState>
  );
};

export default App;
