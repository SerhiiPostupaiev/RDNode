import React, { useContext } from 'react';

import DocumentsContext from '../../context/documents/documentsContext';

const PopupBtn = () => {
  const documentsContext = useContext(DocumentsContext);
  const { setPopup, clearPopup, popup, clearCurrent } = documentsContext;

  const togglePopup = () => {
    if (popup) {
      clearPopup();
      clearCurrent();
    } else {
      setPopup(!popup);
    }
  };

  return (
    <button type='button' className='popup-btn' onClick={togglePopup}>
      {popup ? `-` : '+'}
    </button>
  );
};

export default PopupBtn;
