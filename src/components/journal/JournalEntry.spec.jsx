import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingEntry } from '../../actions/notes';
import JournalEntry from './JournalEntry';

configure({ adapter: new Adapter() });

jest.mock('../../actions/notes', () => ({
  startLoadingEntry: jest.fn(),
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

describe('<JournalEntry />', () => {
  const noteActive = {
    id: '1OsuoVxDS9kn7oI9vWon',
    title: 'title test',
    body: 'body test',
    createdDate: 1652233720664,
  };

  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...noteActive} />
    </Provider>
  );

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call startLoadingEntry', () => {
    const expectId = '1OsuoVxDS9kn7oI9vWon';

    wrapper.find('.journal__entry').prop('onClick')();
    expect(startLoadingEntry).toHaveBeenLastCalledWith(expectId);
  });
});
