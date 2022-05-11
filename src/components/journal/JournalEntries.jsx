import { useSelector } from "react-redux";

import JournalEntire from "./JournalEntry";

const JournalEntries = () => {
  const { data } = useSelector(({ notes }) => notes);

  return (
    <div className="journal__entries">
      {Object.keys(data).map((key) => (
        <JournalEntire key={key} {...data[key]} />
      ))}
    </div>
  );
};

export default JournalEntries;
