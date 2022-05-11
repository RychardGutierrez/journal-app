import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AppRouter from './AppRouter';

import {
  getAuth,
  signInWithEmailAndPassword as signInUserFirebase,
} from 'firebase/auth';
import { login } from '../actions/auth';

const user = 'test@test.com';
const password = '123456';

jest.mock('../actions/auth', () => ({
  login: jest.fn(),
}));

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: { active: { id: 'abc', notes: [] } },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('AppRouter', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it.skip('should call login if I have authenticate', async () => {
    let userExpeted = null;

    await act(async () => {
      const userCredential = await signInUserFirebase(
        getAuth(),
        user,
        password
      );
      userExpeted = userCredential.user;

      const wrapper = await mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );

      expect(login).toHaveBeenCalled();
    });
  });
});
