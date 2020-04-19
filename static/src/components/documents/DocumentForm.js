import React, { useState, useContext, useEffect } from 'react';
import DocumentsContext from '../../context/documents/documentsContext';
import ManagersContext from '../../context/managers/managersContext';

const DocumentForm = () => {
  const documentsContext = useContext(DocumentsContext);
  const managersContext = useContext(ManagersContext);

  const { managers, getManagers } = managersContext;
  const {
    addDocument,
    clearCurrent,
    editDocument,
    current,
    popup,
    clearPopup,
  } = documentsContext;

  useEffect(() => {
    getManagers();

    if (current !== null) {
      setDocument(current);
    } else {
      setDocument({
        content: '',
        manager_id: '',
        fullname: '',
      });
    }
  }, [documentsContext, current]);

  const [document, setDocument] = useState({
    content: '',
    manager_id: '',
    fullname: '',
  });

  const { fullname, content, manager_id } = document;

  const onChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });

    if (e.target.name === 'manager_id') {
      managers.map((item) => {
        if (item.manager_id === +e.target.value) {
          setDocument({
            ...document,
            fullname: item.fullname,
            manager_id: e.target.value,
          });
        }
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addDocument(document);
    } else {
      editDocument(document);
    }
    clearAll();
    clearPopup();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form className='document-form form form-relative' onSubmit={onSubmit}>
      <span
        className='form__close'
        onClick={() => {
          clearCurrent();
          clearPopup();
        }}
      >
        X
      </span>
      <h2>{current ? 'Edit Document' : 'Add Document'}</h2>

      <h4>Select Asignee</h4>
      <div className='form__group'>
        <select name='manager_id' onChange={onChange} required>
          <option value=''></option>
          <option value='unassigned'>unassigned</option>
          {managers &&
            managers.map((item) => (
              <option
                value={item.manager_id}
                key={item.manager_id}
                data-name={item.fullname}
              >
                {item.fullname}
              </option>
            ))}
        </select>
      </div>

      <div className='form__group'>
        <label className='form__label' htmlFor='content'>
          Content:
        </label>
        <textarea
          className='form__textarea'
          name='content'
          value={content}
          onChange={onChange}
          required
        ></textarea>
      </div>

      <div className='form__group'>
        <input type='submit' value={current ? 'Edit' : 'Add'} />
      </div>
    </form>
  );
};

export default DocumentForm;
