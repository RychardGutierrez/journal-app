import { async } from '@firebase/util';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, startLoginEmailPassword, startLogout } from './auth';

const middleware = [thunk];
const mockStore = configureStore(middleware);

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

describe('Auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  it('should return login object', () => {
    const expectResponse = {
      type: '[Auth] Login',
      payload: { uid: 'TEST', name: 'Test' },
    };
    const action = login(initState.auth.uid, initState.auth.name);
    expect(action).toMatchObject(expectResponse);
  });

  it('should return logout object', async () => {
    const expectResponse = [
      { type: '[Auth] Logout', payload: undefined },
      { type: '[Notes] Logout Clean', payload: undefined },
    ];
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions).toMatchObject(expectResponse);
  });

  it('should init start loading', async () => {
    const expectResponse = [
      { type: '[UI] Start Loading', payload: undefined },
      { type: '[UI] End Loading', payload: undefined },
    ];

    const user = 'test@test.com';
    const password = '123456';

    await store.dispatch(startLoginEmailPassword(user, password));
    const actions = store.getActions();
    expect(actions).toMatchObject(expectResponse);
  });
});
