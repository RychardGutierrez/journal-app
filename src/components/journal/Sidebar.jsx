import { useDispatch, useSelector } from "react-redux";

import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { LOGOUT, NEW_ENTRY } from "../../common/constants";

import JournalEntries from "./JournalEntries";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(({ auth }) => auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-user" />
          <span> {name} </span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          {LOGOUT}
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="fa fa-calendar-plus fa-5x" />
        <p className="mt-5">{NEW_ENTRY}</p>
      </div>
      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
