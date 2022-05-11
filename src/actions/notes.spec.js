import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { disableNetwork, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { fireStoreDataBase } from '../firebase/firebase-config';

import {
  refreshNote,
  startNewNote,
  startSaveNote,
  startUploadingImg,
} from './notes';
import { types } from './../types/index';
import { NOTE_PATH } from '../common/constants';

jest.mock('../common/utils', () => ({
  imgFileUpload: jest.fn(() => 'https://test-url/test-picture.jpg'),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: 'TEST',
    name: 'Test',
  },
  notes: {
    active: {
      id: '34OTkx6Uz8K143GrKfLi',
      title: 'Hello title',
      body: 'body title',
    },
  },
};

let store = mockStore(initState);

describe('notes actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  afterEach(() => {
    disableNetwork(fireStoreDataBase);
  });

  it.skip('should created new note', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        createdDate: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    const noteRef = doc(
      fireStoreDataBase,
      `/${initState.auth.uid}${NOTE_PATH}/${docId}`
    );

    await deleteDoc(noteRef);
  });

  it.skip('should updated the note', async () => {
    const note = {
      id: '6qYhRlE9BtW5UuBxXA0b',
      title: 'title',
      body: 'body',
    };
    await store.dispatch(startSaveNote(note));
    await store.dispatch(refreshNote(initState.auth.uid, note));

    const actions = store.getActions();
    // const noteRef = doc(
    //   fireStoreDataBase,
    //   `/${initState.auth.uid}${NOTE_PATH}/${note.id}`
    // );
    // const docSnap = await getDoc(noteRef);

    // expect(docSnap.data().title).toBe(note.title);
    expect(actions[0].type).toBe(types.notesUpdated);
  });

  it.skip('should update url of the note', async () => {
    const file = new File([], 'filePicture.jpg');
    await store.dispatch(startUploadingImg(file));
    // const noteRef = doc(
    //   fireStoreDataBase,
    //   `/${initState.auth.uid}${NOTE_PATH}/${note.id}`
    // );
    // const docSnap = await getDoc(noteRef);

    // expect(docSnap.data().url).toBe("https://test-url/test-picture.jpg");
  });
});
