import React from 'react';

import Home from './pages/Home';

import DocumentsState from '../context/documents/DocumentsState';
import ManagersState from '../context/managers/ManagersState';

import './App.less';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const App = () => {
  return (
    <DocumentsState>
      <ManagersState>
        <Home />
      </ManagersState>
    </DocumentsState>
  );
};

export default App;
