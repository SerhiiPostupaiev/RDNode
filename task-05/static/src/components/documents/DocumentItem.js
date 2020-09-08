import React, { useContext } from 'react';

import DocumentsContext from '../../context/documents/documentsContext';

const DocumentItem = ({
  document: { document_id, manager_id, content, fullname },
  document,
}) => {
  const documentsContext = useContext(DocumentsContext);

  const {
    deleteDocument,
    clearCurrent,
    editDocument,
    current,
    popup,
    setPopup,
    clearPopup,
    setCurrent,
  } = documentsContext;

  const onDelete = () => {
    deleteDocument(document_id);
    clearCurrent();
  };

  return (
    <ul className='documents-list__item document'>
      <li className='document__content'>
        <div className='document__head'>
          <h3>Content:</h3>
          <div className='document__controls'>
            <button
              className='documents-list__btn'
              type='button'
              onClick={() => {
                setPopup(true);
                setCurrent(document);
              }}
            >
              <i className='fas fa-edit'></i>
            </button>

            <button
              className='documents-list__btn'
              type='button'
              onClick={onDelete}
            >
              <i className='far fa-trash-alt'></i>
            </button>
          </div>
        </div>
        {content}
      </li>
      <li className='document__asignee'>
        <h3 className='document__asignee_caption'>Asignee</h3>
        {+manager_id ? fullname : 'Not assigned'}
      </li>
    </ul>
  );
};

export default DocumentItem;
