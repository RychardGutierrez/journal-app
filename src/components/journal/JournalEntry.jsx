import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { startLoadingEntry } from "../../actions/notes";
import { FORMAT_WEEK, FORMAT_DAY } from "./../../common/constants";

const JournalEntry = ({ id, title, body, createdDate, url }) => {
  const dispatch = useDispatch();

  const dateNote = dayjs(createdDate);

  const handleEntryShow = () => {
    dispatch(startLoadingEntry(id));
  };

  return (
    <div
      className="journal__entry  animate__animated animate__fadeIn animate_faster"
      onClick={handleEntryShow}
    >
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          {title ? title : "Without Title"}
        </p>
        <p className="journal__entry-content">
          {body ? body : "Without Description"}
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>{dateNote.format(FORMAT_WEEK)}</span>
        <h4>{dateNote.format(FORMAT_DAY)}</h4>
      </div>
    </div>
  );
};

JournalEntry.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  createdDate: PropTypes.string,
  url: PropTypes.string,
};

export default JournalEntry;
