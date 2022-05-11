import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { activeNote, startSaveNote } from "../../actions/notes";

import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";
import { startDeleteNote } from "./../../actions/notes";
import { messageDelete } from "../../common/messages";
import { DELETE } from "../../common/constants";

const NoteScreen = ({ id, title, body, url, createdDate }) => {
  const dispatch = useDispatch();
  const { handleInputChange, values, reset } = useForm({
    id,
    title,
    body,
    url,
    createdDate,
  });

  const activeId = useRef(id);

  useMemo(() => {
    if (activeId.current !== id) {
      reset({ title, body, url });
      activeId.current = id;
    }
  }, [body, id, reset, title, url]);

  useEffect(() => {
    dispatch(activeNote(activeId.current, { ...values, url }));
  }, [dispatch, url, values]);

  const handleSaveNote = () => {
    dispatch(startSaveNote({ ...values, id: activeId.current, url }));
  };

  const handleDelete = async () => {
    const { isConfirmed } = await messageDelete();
    if (isConfirmed) {
      dispatch(startDeleteNote(activeId.current));
    }
  };

  return (
    <div className="notes__main-content  animate__animated animate__fadeIn animate_faster">
      <NotesAppBar createdDate={createdDate} handleSaveNote={handleSaveNote} />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder={values.title || "Title"}
          className="notes__title-input"
          autoComplete="off"
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          value={values.body}
          placeholder={values.body || "Description"}
          className="notes__textarea"
          onChange={handleInputChange}
        ></textarea>
        {url && (
          <div className="notes__image">
            <img src={url} alt="some img" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        {DELETE}
      </button>
    </div>
  );
};

NoteScreen.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  createdDate: PropTypes.string,
  url: PropTypes.string,
};

export default NoteScreen;
