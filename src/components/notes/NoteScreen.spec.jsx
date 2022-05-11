import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../actions/notes';
import NoteScreen from './NoteScreen';

configure({ adapter: new Adapter() });

jest.mock('../../actions/notes', () => ({
  activeNote: jest.fn(),
  startSaveNote: jest.fn(),
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

describe('< NoteScreen/>', () => {
  const noteActive = {
    id: '1OsuoVxDS9kn7oI9vWon',
    title: '',
    body: '',
    createdDate: 1652233720664,
  };

  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen {...noteActive} />
    </Provider>
  );

  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call activeNote', () => {
    const expectId = '1OsuoVxDS9kn7oI9vWon';
    const expectData = {
      body: '',
      createdDate: 1652233720664,
      id: '1OsuoVxDS9kn7oI9vWon',
      title: 'test title',
      url: undefined,
    };

    wrapper.find('input[name="title"]').simulate('change', {
      target: { name: 'title', value: 'test title' },
    });

    expect(activeNote).toHaveBeenLastCalledWith(expectId, expectData);
  });
});
