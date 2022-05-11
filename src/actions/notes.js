import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  fireStoreAddDoc,
  fireStoreCollection,
  fireStoreDataBase,
} from '../firebase/firebase-config';

import { NOTE_PATH, NEW_NOTE } from '../common/constants';
import { loadNotes } from '../common/loadNotes';
import { imgFileUpload } from '../common/utils';
import { types } from '../types';
import { newAction } from './action';
import {
  messageClose,
  messageNoteDeleteWait,
  messageNoteUpdate,
} from '../common/messages';
import { messageNoteUpdateError } from './../common/errorMessage';
import { messageNoteUpdateWait } from './../common/messages';

export const startNewNote = () => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth;
    const documentRef = await fireStoreAddDoc(
      fireStoreCollection(fireStoreDataBase, `${uid}${NOTE_PATH}`),
      NEW_NOTE
    );

    dispatch(activeNote(documentRef.id, NEW_NOTE));
    dispatch(startLoadingNotes(uid));
  } catch (error) {
    console.log(error);
  }
};

export const activeNote = (id, note) =>
  newAction(types.notesActive, { ...note, id });

export const startLoadingNotes = (uid) => async (dispatch) => {
  const notes = await loadNotes(uid);
  dispatch(newAction(types.notesLoad, notes));
};

export const startLoadingEntry = (id) => (dispatch, getState) => {
  const { data } = getState().notes;
  dispatch(activeNote(id, data[id]));
};

export const refreshNote = (id, note) =>
  newAction(types.notesUpdated, { ...note, id });

export const startSaveNote = (note) => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth;
    const { active } = getState().notes;
    const noteReference = doc(
      fireStoreDataBase,
      `${uid}${NOTE_PATH}/${active.id}`
    );
    const noteToFireStore = { ...note };

    !noteToFireStore.url && delete noteToFireStore.url;
    delete noteToFireStore.id;
    await updateDoc(noteReference, noteToFireStore);
    dispatch(refreshNote(note.id, noteToFireStore));

    messageNoteUpdate();
  } catch (error) {
    messageNoteUpdateError();
  }
};

export const startUploadingImg = (imgFile) => async (dispatch, getState) => {
  messageNoteUpdateWait();

  const { active } = getState().notes;
  const fileUrl = await imgFileUpload(imgFile);
  const newNoteActive = { ...active, url: fileUrl };
  dispatch(startSaveNote(newNoteActive));

  messageClose();
};

const deleteNote = (id) => newAction(types.notesDelete, { id });

export const startDeleteNote = (id) => async (dispatch, getState) => {
  try {
    messageNoteDeleteWait();

    const { uid } = getState().auth;
    const noteRef = doc(fireStoreDataBase, `${uid}${NOTE_PATH}/${id}`);
    await deleteDoc(noteRef);
    dispatch(deleteNote(id));

    messageClose();
  } catch (error) {
    console.log(error);
  }
};

export const cleanNote = () => newAction(types.notesLogoutClean);
