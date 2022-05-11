import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import RegisterScreen from './RegisterScreen';

jest.mock('../../actions/auth', () => ({
  startRegisterWithEmailPasswordName: jest.fn(),
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

describe('<RegisterScreen>', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it('should render Register screen', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should register user', () => {
    wrapper.find('input[name="name"]').simulate('change', {
      target: { value: 'Lucas the duck', name: 'name' },
    });
    wrapper.find('input[name="email"]').simulate('change', {
      target: { value: 'lucas.duck@gmail.com', name: 'email' },
    });
    wrapper.find('input[name="password"]').simulate('change', {
      target: { value: '123Lucas@', name: 'password' },
    });
    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: { value: '123Lucas@', name: 'confirmPassword' },
    });
    wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} });

    expect(startRegisterWithEmailPasswordName).toHaveBeenLastCalledWith({
      email: 'lucas.duck@gmail.com',
      name: 'Lucas the duck',
      password: '123Lucas@',
    });
  });
});
