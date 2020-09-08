import {
  ADD_DIRECTOR,
  DELETE_DIRECTOR,
  EDIT_DIRECTOR,
  GET_DIRECTORS,
  DIRECTOR_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DIRECTORS:
      return {
        ...state,
        directors: action.payload,
      };

    case ADD_DIRECTOR:
      return {
        ...state,
        directors: [action.payload, ...state.directors],
      };

    case DELETE_DIRECTOR:
      return {
        ...state,
        directors: state.directors.filter(
          (director) => directors.id !== action.payload
        ),
      };

    case EDIT_DIRECTOR:
      return {
        ...state,
        directors: state.directors.map((director) =>
          director.id === +action.payload.id ? action.payload : director
        ),
      };

    case DIRECTOR_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
};
