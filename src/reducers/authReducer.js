import { types } from "../types";

const initialState = {};

/**
 *
 * @param {*} state {uid:xxx. user:"User name"}
 * @param {*} action {type: login, payload:{uid, name}}
 */
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.name,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
