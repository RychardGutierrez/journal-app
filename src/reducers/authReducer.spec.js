import { authReducer } from "./authReducer";
import { newAction } from "./../actions/action";
import { types } from "./../types/index";

const initialState = {};

describe("authReducer", () => {
  it("should return default state", () => {
    expect(authReducer(initialState, newAction(null, null))).toStrictEqual(
      initialState,
    );
  });

  it("should return login state", () => {
    const userLogin = {
      uid: "asdffxcvvv123",
      name: "user test",
    };

    expect(
      authReducer(initialState, newAction(types.login, userLogin)),
    ).toStrictEqual(userLogin);
  });

  it("should return logout state", () => {
    const userLogout = {};

    expect(
      authReducer(initialState, newAction(types.logout, userLogout)),
    ).toStrictEqual(userLogout);
  });
});
