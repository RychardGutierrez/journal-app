import { useSelector } from "react-redux";

import NoteScreen from "../notes/NoteScreen";
import Sidebar from "./Sidebar";
import NothingSelected from "./NothingSelected";

const JournalScreen = () => {
  const { active } = useSelector(({ notes }) => notes);

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate_faster">
      <Sidebar />
      <main>{active ? <NoteScreen {...active} /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;
