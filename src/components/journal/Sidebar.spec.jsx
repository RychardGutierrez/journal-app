import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import Sidebar from './Sidebar';
configure({ adapter: new Adapter() });

jest.mock('../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  auth: {
    uid: '123-test',
    name: 'Lucas',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    data: {},
    active: null,
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('<Sidebar />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call startLogout', () => {
    wrapper.find('.btn').prop('onClick')({ preventDefault: () => {} });
    expect(startLogout).toHaveBeenCalled();
  });

  it('should call startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')({
      preventDefault: () => {},
    });
    expect(startNewNote).toHaveBeenCalled();
  });
});
