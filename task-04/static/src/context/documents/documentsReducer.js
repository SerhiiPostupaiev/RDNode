import {
  ADD_DOCUMENT,
  GET_DOCUMENTS,
  EDIT_DOCUMENT,
  DELETE_DOCUMENT,
  ASSIGN_DOCUMENT,
  WITHDRAW_DOCUMENT,
  CLEAR_CURRENT,
  SET_CURRENT,
  CLEAR_POPUP,
  SET_POPUP,
  DOCUMENT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      };

    case ADD_DOCUMENT:
      return {
        ...state,
        documents: [action.payload, ...state.documents],
      };

    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(
          (document) => document.document_id !== action.payload
        ),
      };

    case EDIT_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map((document) =>
          +document.document_id === +action.payload.document_id
            ? action.payload
            : document
        ),
      };

    case DOCUMENT_ERROR:
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

    case CLEAR_POPUP:
      return {
        ...state,
        popup: null,
      };

    case SET_POPUP:
      return {
        ...state,
        popup: action.payload,
      };

    default:
      return state;
  }
};
