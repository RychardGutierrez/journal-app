import { types } from "../types";
import { newAction } from "./action";

export const uiSetErrorMessage = ({ messageError }) =>
  newAction(types.uiSetError, { messageError });

export const uiRemoveErrorMessage = () => newAction(types.uiRemoveError);

export const uiStartLoading = () => newAction(types.uiStartLoading);

export const uiEndLoading = () => newAction(types.uiEndLoading);
