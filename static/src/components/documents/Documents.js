import React, { Fragment, useContext, useEffect } from 'react';

import DocumentsContext from '../../context/documents/documentsContext';

import DocumentItem from './DocumentItem';
import DocumentForm from './DocumentForm';
import PopupBtn from '../layout/PopupBtn';

import './documents.less';

const Documents = () => {
  const documentsContext = useContext(DocumentsContext);

  const { documents, getDocuments, popup } = documentsContext;

  useEffect(() => {
    getDocuments();
    //eslint-disable-next-line
  }, []);

  if (documents !== null && documents.length === 0) {
    return (
      <Fragment>
        {popup && <DocumentForm />}
        <h4>Please add a document</h4>
        <PopupBtn />
      </Fragment>
    );
  }

  return (
    <div className='documents-list'>
      {popup && <DocumentForm />}
      <h1>Documents</h1>
      {documents !== null &&
        documents.map((item) => (
          <DocumentItem document={item} key={item.document_id} />
        ))}

      <PopupBtn />
    </div>
  );
};

export default Documents;
