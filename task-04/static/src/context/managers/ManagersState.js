import React, { useReducer } from 'react';

import ManagersContext from './managersContext';
import managersReducer from './managersReducer';

import {
  ADD_MANAGER,
  EDIT_MANAGER,
  DELETE_MANAGER,
  GET_MANAGERS,
  MANAGER_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
} from '../types';

const ManagersState = (props) => {
  const initialState = {
    managers: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(managersReducer, initialState);

  const addManager = async (manager) => {
    try {
      const response = await fetch('http://localhost:5000/managers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(manager),
      });
      const result = await response.json();

      dispatch({ type: ADD_MANAGER, payload: result.data });
    } catch (err) {
      dispatch({ type: MANAGER_ERROR, payload: err });
    }
  };

  const editManager = async (manager) => {
    try {
      const response = await fetch(
        `http://localhost:5000/managers/${manager.manager_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(manager),
        }
      );

      const result = await response.json();
      dispatch({ type: EDIT_MANAGER, payload: result.data });
    } catch (err) {
      dispatch({ type: MANAGER_ERROR, payload: err });
    }
  };

  const deleteManager = async (manager_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/managers/${manager_id}`,
        {
          method: 'DELETE',
        }
      );
      await response.json();

      dispatch({ type: DELETE_MANAGER, payload: manager_id });
    } catch (err) {
      dispatch({ type: MANAGER_ERROR, payload: err });
    }
  };

  const getManagers = async () => {
    try {
      const response = await fetch('http://localhost:5000/managers');
      const result = await response.json();

      dispatch({ type: GET_MANAGERS, payload: result.data });
    } catch (err) {
      dispatch({ type: MANAGER_ERROR, payload: err });
    }
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const setCurrent = (manager) => {
    dispatch({ type: SET_CURRENT, payload: manager });
  };

  return (
    <ManagersContext.Provider
      value={{
        managers: state.managers,
        error: state.error,
        current: state.current,
        addManager,
        editManager,
        deleteManager,
        getManagers,
        clearCurrent,
        setCurrent,
      }}
    >
      {props.children}
    </ManagersContext.Provider>
  );
};

export default ManagersState;
