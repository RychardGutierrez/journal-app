import React from "react";
import { CREATE_ENTRY, SELECT_SOMETHING } from "../../common/constants";

const NothingSelected = () => {
  return (
    <div className="nothing__main-content">
      <h2>{SELECT_SOMETHING}</h2>
      <br />
      <h3>{CREATE_ENTRY}</h3>
      <i className="fa fa-book fa-4x mt-5" />
    </div>
  );
};

export default NothingSelected;
