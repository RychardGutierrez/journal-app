import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword as createUserFirebase,
  updateProfile,
  signInWithEmailAndPassword as signInUserFirebase,
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';

import { types } from '../types';
import { newAction } from './action';
import { cleanNote } from './notes';
import { uiEndLoading, uiSetErrorMessage, uiStartLoading } from './ui';
import {
  messageErrorRegisterNewUser,
  messageLoginError,
} from '../common/errorMessage';
import { messageWelcome } from '../common/messages';

export const login = (uid, name) => newAction(types.login, { uid, name });

export const startLogout = () => async (dispatch) => {
  try {
    await getAuth().signOut();
    dispatch(newAction(types.logout));
    dispatch(cleanNote());
  } catch (error) {
    console.log(error);
  }
};

export const startLoginEmailPassword =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(uiStartLoading());
    try {
      const { user } = await signInUserFirebase(getAuth(), email, password);
      const response = dispatch(login(user.uid, user.displayName));

      messageWelcome(user.displayName);
      return response;
    } catch (error) {
      return messageLoginError();
    } finally {
      return dispatch(uiEndLoading());
    }
  };

export const startGoogleLogin = () => async (dispatch) => {
  try {
    const { user } = await signInWithPopup(getAuth(), googleAuthProvider);
    dispatch(login(user.uid, user.displayName));

    messageWelcome(user.displayName);
  } catch (error) {
    messageLoginError();
  } finally {
    dispatch(uiEndLoading());
  }
};

export const startRegisterWithEmailPasswordName =
  ({ email, password, name }) =>
  async (dispatch) => {
    dispatch(uiStartLoading());
    try {
      const { user } = await createUserFirebase(getAuth(), email, password);
      await updateProfile(user, { displayName: name });
      dispatch(login(user.uid, user.displayName));

      messageWelcome(user.displayName);
    } catch (error) {
      dispatch(uiSetErrorMessage(messageErrorRegisterNewUser));
    } finally {
      dispatch(uiEndLoading());
    }
  };
