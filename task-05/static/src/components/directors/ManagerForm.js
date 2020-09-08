import React, { useState, useContext, useEffect } from 'react';
import DirectorsContext from '../../context/directors/directorsContext';

const ManagerForm = () => {
  const directorsContext = useContext(DirectorsContext);

  const { addDirector, clearCurrent, editDirector, current } = directorsContext;

  useEffect(() => {
    if (current !== null) {
      setDirector(current);
    } else {
      setDirector({
        firstName: '',
        lastName: '',
      });
    }
  }, [directorsContext, current]);

  const [manager, setDirector] = useState({
    fullname: '',
  });

  const { fullname } = manager;

  const onChange = (e) =>
    setManager({ ...manager, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addManager(manager);
    } else {
      editManager(manager);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form className='manager-form form' onSubmit={onSubmit}>
      <h2>{current ? 'Edit Manager' : 'Add Manager'}</h2>
      <div className='form__group'>
        <label className='form__label' htmlFor='manager'>
          Full Name:
        </label>
        <input
          type='text'
          name='fullname'
          value={fullname}
          onChange={onChange}
          required
        />
      </div>

      <div className='form__group'>
        <input type='submit' value={current ? 'Edit' : 'Add'} />
      </div>
    </form>
  );
};

export default ManagerForm;
