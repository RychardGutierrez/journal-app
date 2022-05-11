import { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { startUploadingImg } from "../../actions/notes";
import { FORMAT_DATE, PICTURE, SAVE } from "../../common/constants";

const NotesAppBar = ({ createdDate, handleSaveNote }) => {
  const dispatch = useDispatch();
  const refInputImg = useRef(null);

  const dateNote = dayjs(createdDate).format(FORMAT_DATE);

  const handleUploadPicture = () => {
    refInputImg.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!!file) {
      dispatch(startUploadingImg(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>{dateNote}</span>
      <input
        type="file"
        className="notes__file"
        onChange={handleFileChange}
        ref={refInputImg}
      />
      <div>
        <button className="btn" onClick={handleUploadPicture}>
          {PICTURE}
        </button>
        <button className="btn" onClick={handleSaveNote}>
          {SAVE}
        </button>
      </div>
    </div>
  );
};

NotesAppBar.prototype = {
  createdDate: PropTypes.string.isRequired,
  handleSaveNote: PropTypes.func.isRequired,
};

export default NotesAppBar;
