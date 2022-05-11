import { types } from "./index";

describe("Types", () => {
  it("should return object types", () => {
    const typesTest = {
      login: "[Auth] Login",
      logout: "[Auth] Logout",
      notesActive: "[Notes] Set Active Note",
      notesAddNew: "[Notes] New Note",
      notesDelete: "[Notes] Delete Note",
      notesImageUrl: "[Notes] Updated Image Url",
      notesLoad: "[Notes] Load Notes",
      notesLogoutClean: "[Notes] Logout Clean",
      notesUpdated: "[Notes] Updated Note",
      uiEndLoading: "[UI] End Loading",
      uiRemoveError: "[UI] Remove Error",
      uiSetError: "[UI] Set Error",
      uiStartLoading: "[UI] Start Loading",
    };

    expect(types).toStrictEqual(typesTest);
  });
});
