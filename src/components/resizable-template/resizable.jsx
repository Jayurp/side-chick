import React, { useState } from "react";
import "./resizable.css";
import MinimizeIcon from "../../assets/minimize-icon.svg";
import MaximizeIcon from "../../assets/maximize-icon.svg";
import RestoreIcon from "../../assets/restore-icon.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { Rnd } from "react-rnd";

const ResizableWindow = ({ children, title }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 800,
    height: 600,
    x: 250,
    y: 10,
  });

  const toggleMaximize = () => {
    if (isMaximized) {
      setWindowSize({
        width: 800,
        height: 600,
        x: 250,
        y: 10,
      });
    } else {
      setWindowSize({
        width: window.innerWidth,
        height: "94vh",
        x: 0,
        y: 0,
      });
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <Rnd
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowSize.x, y: windowSize.y }}
      onDragStop={(e, d) => setWindowSize({ ...windowSize, x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) =>
        setWindowSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...position,
        })
      }
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="window-header"
      className="resizable-window"
    >
      <div className="window-header">
        <p className="window-title">{title}</p>
        <div className="icon-container">
          <div className="icon">
            <img src={MinimizeIcon} alt="Minimize" />
          </div>
          <div className="icon" onClick={toggleMaximize}>
            <img
              src={isMaximized ? RestoreIcon : MaximizeIcon}
              alt={isMaximized ? "Restore" : "Maximize"}
            />
          </div>
          <div className="icon">
            <img src={CloseIcon} alt="Close" />
          </div>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </Rnd>
  );
};

export default ResizableWindow;
