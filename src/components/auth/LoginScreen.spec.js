import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import LoginScreen from './LoginScreen';

jest.mock('../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
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
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Render LoginScreen', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it('should show correct login', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute the Login Google', () => {
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  it('should execute the Login', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: { value: 'lucas@gmail.com', name: 'email' },
    });
    wrapper.find('input[name="password"]').simulate('change', {
      target: { value: '123Lucas@', name: 'password' },
    });
    wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} });

    expect(startLoginEmailPassword).toHaveBeenLastCalledWith({
      email: 'lucas@gmail.com',
      password: '123Lucas@',
    });
  });
});
