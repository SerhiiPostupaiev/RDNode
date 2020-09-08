import React, { useEffect, useContext, Fragment } from 'react';

import ManagersContext from '../../context/managers/managersContext';

import ManagerItem from './ManagerItem';
import ManagerForm from './ManagerForm';

import './managers.less';

const Managers = () => {
  const managersContext = useContext(ManagersContext);

  const { managers, getManagers } = managersContext;

  useEffect(() => {
    getManagers();
    //eslint-disable-next-line
  }, []);

  if (managers !== null && managers.length === 0) {
    return (
      <Fragment>
        <h4>Please add a manager</h4>
        <ManagerForm />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ul className='managers-list'>
        <h1>Managers</h1>
        {managers !== null &&
          managers.map((item) => (
            <ManagerItem manager={item} key={item.manager_id} />
          ))}
      </ul>
      <ManagerForm />
    </Fragment>
  );
};

export default Managers;
