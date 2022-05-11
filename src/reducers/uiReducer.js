import { types } from "../types";

const initialState = {
  loading: false,
  messageError: null,
};

/**
 * @param {*} state { loading: false, messageError: null}
 * @param {*} action {type: UI, payload:{loading, messageError}}
 */
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        messageError: action.payload.messageError,
      };

    case types.uiRemoveError:
      return {
        ...state,
        messageError: null,
      };

    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.uiEndLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
