import React, { useContext } from 'react';

import ManagerContext from '../../context/directors/directorsContext';

const ManagerItem = ({ manager: { manager_id, fullname }, manager }) => {
  const managerContext = useContext(ManagerContext);
  const { deleteManager, setCurrent, clearCurrent } = managerContext;

  const onDelete = () => {
    deleteManager(manager_id);
    clearCurrent();
  };

  return (
    <li className='managers-list__item'>
      <span>{fullname}</span>
      <div className='managers-list__controls'>
        <button
          className='managers-list__btn'
          type='button'
          onClick={() => setCurrent(manager)}
        >
          <i className='fas fa-edit'></i>
        </button>

        <button className='managers-list__btn' type='button' onClick={onDelete}>
          <i className='far fa-trash-alt'></i>
        </button>
      </div>
    </li>
  );
};

export default ManagerItem;
