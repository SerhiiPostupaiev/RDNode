import React, { useReducer } from 'react';

import DirectorsContext from './directorsContext';
import directorsReducer from './directorsReducer';

import {
  ADD_DIRECTOR,
  DELETE_DIRECTOR,
  EDIT_DIRECTOR,
  GET_DIRECTORS,
  DIRECTOR_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
} from '../types';

const DirectorsState = (props) => {
  const initialState = {
    directors: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(directorsReducer, initialState);

  const addDirector = async (director) => {
    try {
      const response = await fetch('http://localhost:5000/directors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(director),
      });
      const result = await response.json();

      dispatch({ type: ADD_DIRECTOR, payload: result.data });
    } catch (err) {
      dispatch({ type: DIRECTOR_ERROR, payload: err });
    }
  };

  const editDirector = async (director) => {
    try {
      const response = await fetch(
        `http://localhost:5000/directors/${director.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(director),
        }
      );

      const result = await response.json();
      dispatch({ type: EDIT_DIRECTOR, payload: result.data });
    } catch (err) {
      dispatch({ type: DIRECTOR_ERROR, payload: err });
    }
  };

  const deleteDirector = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/directors/${id}`, {
        method: 'DELETE',
      });
      await response.json();

      dispatch({ type: DELETE_DIRECTOR, payload: id });
    } catch (err) {
      dispatch({ type: DIRECTOR_ERROR, payload: err });
    }
  };

  const getDirectors = async () => {
    try {
      const response = await fetch('http://localhost:5000/directors');
      const result = await response.json();

      dispatch({ type: GET_DIRECTORS, payload: result.data });
    } catch (err) {
      dispatch({ type: DIRECTOR_ERROR, payload: err });
    }
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const setCurrent = (director) => {
    dispatch({ type: SET_CURRENT, payload: director });
  };

  return (
    <DirectorsContext.Provider
      value={{
        directors: state.directors,
        error: state.error,
        current: state.current,
        addDirector,
        editDirector,
        deleteDirector,
        getDirectors,
        clearCurrent,
        setCurrent,
      }}
    >
      {props.children}
    </DirectorsContext.Provider>
  );
};

export default DirectorsState;
