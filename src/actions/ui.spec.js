import {
  uiEndLoading,
  uiRemoveErrorMessage,
  uiSetErrorMessage,
  uiStartLoading,
} from "./ui";

describe("ui actions", () => {
  it("should return error message", () => {
    const action = uiSetErrorMessage({ messageError: "Message error test" });
    const actionExpect = {
      payload: {
        messageError: "Message error test",
      },
      type: "[UI] Set Error",
    };

    expect(action).toStrictEqual(actionExpect);
  });

  it("should remove error message", () => {
    const action = uiRemoveErrorMessage();
    const actionExpect = { payload: undefined, type: "[UI] Remove Error" };

    expect(action).toStrictEqual(actionExpect);
  });

  it("should start loading", () => {
    const action = uiStartLoading();
    const actionExpect = { payload: undefined, type: "[UI] Start Loading" };

    expect(action).toStrictEqual(actionExpect);
  });

  it("should end loading", () => {
    const action = uiEndLoading();
    const actionExpect = { payload: undefined, type: "[UI] End Loading" };

    expect(action).toStrictEqual(actionExpect);
  });
});
