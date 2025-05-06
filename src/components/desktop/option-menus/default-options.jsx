import React from "react";
import "./default-options.css";

function DefaultOptions() {
  return (
    <div className="default-options">
      <div className="default-options__option">New</div>
      <div className="default-options__option">New Window</div>
      <div className="default-options__option">New Folder</div>
      <div className="default-options__option">Rename</div>
      <div className="default-options__option">Delete</div>
      <div className="default-options__option">Properties</div>
    </div>
  );
}

export default DefaultOptions;
