import {
  ADD_MANAGER,
  EDIT_MANAGER,
  DELETE_MANAGER,
  GET_MANAGERS,
  MANAGER_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MANAGERS:
      return {
        ...state,
        managers: action.payload,
      };

    case ADD_MANAGER:
      return {
        ...state,
        managers: [action.payload, ...state.managers],
      };

    case DELETE_MANAGER:
      return {
        ...state,
        managers: state.managers.filter(
          (manager) => manager.manager_id !== action.payload
        ),
      };

    case EDIT_MANAGER:
      return {
        ...state,
        managers: state.managers.map((manager) =>
          manager.manager_id === +action.payload.manager_id
            ? action.payload
            : manager
        ),
      };

    case MANAGER_ERROR:
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
