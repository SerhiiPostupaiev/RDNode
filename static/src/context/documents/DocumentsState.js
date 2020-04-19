import React, { useReducer } from 'react';

import DocumentsContext from './documentsContext';
import documentsReducer from './documentsReducer';

import {
  ADD_DOCUMENT,
  GET_DOCUMENTS,
  EDIT_DOCUMENT,
  DELETE_DOCUMENT,
  DOCUMENT_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
  CLEAR_POPUP,
  SET_POPUP,
} from '../types';

const DocumentsState = (props) => {
  const initialState = {
    documents: null,
    error: null,
    current: null,
    popup: null,
  };

  const [state, dispatch] = useReducer(documentsReducer, initialState);

  const addDocument = async (document) => {
    try {
      const response = await fetch('http://localhost:5000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          manager_id:
            document.manager_id !== 'unassigned' ? document.manager_id : 'null',
          content: document.content,
        }),
      });
      const result = await response.json();
      if (document.manager_id !== 'unassigned') {
        result.data.fullname = document.fullname;
      }

      dispatch({ type: ADD_DOCUMENT, payload: result.data });
    } catch (err) {
      dispatch({ type: DOCUMENT_ERROR, payload: err });
    }
  };

  const editDocument = async (document) => {
    try {
      const response = await fetch(
        `http://localhost:5000/documents/${document.document_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            manager_id:
              document.manager_id !== 'unassigned'
                ? document.manager_id
                : 'null',
            content: document.content,
          }),
        }
      );
      const result = await response.json();
      if (document.manager_id !== 'unassigned') {
        result.data.fullname = document.fullname;
      }

      dispatch({ type: EDIT_DOCUMENT, payload: result.data });
    } catch (err) {
      dispatch({ type: DOCUMENT_ERROR, payload: err });
    }
  };

  const deleteDocument = async (document_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/documents/${document_id}`,
        {
          method: 'DELETE',
        }
      );
      await response.json();

      dispatch({ type: DELETE_DOCUMENT, payload: document_id });
    } catch (err) {
      dispatch({ type: DOCUMENT_ERROR, payload: err });
    }
  };

  const getDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/documents');
      const result = await response.json();

      dispatch({ type: GET_DOCUMENTS, payload: result.data });
    } catch (err) {
      dispatch({ type: DOCUMENT_ERROR, payload: err });
    }
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const setCurrent = (document) => {
    dispatch({ type: SET_CURRENT, payload: document });
  };

  const clearPopup = () => {
    dispatch({ type: CLEAR_POPUP });
  };

  const setPopup = (popup) => {
    dispatch({ type: SET_POPUP, payload: popup });
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents: state.documents,
        error: state.error,
        current: state.current,
        popup: state.popup,
        addDocument,
        editDocument,
        deleteDocument,
        getDocuments,
        setCurrent,
        clearCurrent,
        setPopup,
        clearPopup,
      }}
    >
      {props.children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsState;
