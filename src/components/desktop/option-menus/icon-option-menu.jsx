import React from "react";
import "./icon-option-menu.css";

function IconOptionMenu() {
  return (
    <div className="icon-option-menu">
      <div className="icon-option-item" style={{ borderRadius: "5px 5px 0 0" }}>
        <p className="option" style={{ fontWeight: "bold" }}>
          Open
        </p>
        <p className="option">Pin to Quick access</p>
        <p className="option">Manage</p>
        <p className="option">Pin to Start</p>
      </div>
      <div className="icon-option-item">
        <p className="option">Map network drive...</p>
        <p className="option">Disconnect netowrk drive...</p>
      </div>
      <div className="icon-option-item">
        <p className="option">Create shortcut</p>
        <p className="option">Delete</p>
        <p className="option">Rename</p>
      </div>
      <div className="last-item" style={{ borderRadius: "0 0 5px 5px" }}>
        <p className="option">Properties</p>
      </div>
    </div>
  );
}

export default IconOptionMenu;
