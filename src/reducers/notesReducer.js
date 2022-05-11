import { types } from "../types";

const initialState = {
  data: {},
  active: null,
};

/**
 *
 * @param {*} state
 * {
 *   id:xxx,
 *   title:"title",
 *   body:"body",
 *   createDate:1xxx,
 *   url:"https://res.cloudinary.com"
 * }
 * @param {*} action {type: notes, payload:{}}
 */
export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return { ...state, active: { ...action.payload } };

    case types.notesLoad:
      return { ...state, data: { ...action.payload } };

    case types.notesUpdated:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: { ...action.payload },
        },
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        data: Object.fromEntries(
          Object.entries(state.data).filter(
            ([key]) => key !== action.payload.id,
          ),
        ),
      };

    case types.notesLogoutClean: {
      return initialState;
    }

    default:
      return state;
  }
};
