import React, { useEffect, useState } from "react";
import "./desktop.css";
import ThisPcIcon from "../../assets/this-pc-icon.png";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider } from "react-grid-layout";
import IconOptionMenu from "./option-menus/icon-option-menu";

function Desktop() {
  const [maxRows, setMaxRows] = React.useState(7);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Changed ref to state for coordinates
  const [layout, setLayout] = useState([
    { i: "icon1", x: 0, y: 0, w: 1, h: 1 },
    { i: "icon2", x: 1, y: 0, w: 1, h: 1 },
  ]);
  const [showIconOptions, setShowIconOptions] = useState(false);

  const ResponsiveGridLayout = WidthProvider(GridLayout);

  useEffect(() => {
    const updateRows = () => {
      const vh = window.innerHeight * 0.94; // 94vh
      const rows = Math.floor(vh / 90); // 90 = your rowHeight
      setMaxRows(rows);
    };

    updateRows(); // run on mount
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRightClickOnIcon = (e) => {
    e.preventDefault();
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition); // Update state with new coordinates
    setShowIconOptions(true);
  };

  const handleClickOutside = (event) => {
    // If the click is outside the options menu, close it
    if (
      !event.target.closest(".icon-option-menu") &&
      !event.target.closest(".desktop-icon")
    ) {
      setShowIconOptions(false);
    }
  };

  return (
    <div className="desktop">
      <ResponsiveGridLayout
        className="grid-layout"
        layout={layout}
        cols={15}
        rowHeight={90}
        maxRows={maxRows}
        autoSize={false}
        compactType={null}
        preventCollision={true}
        isResizable={false}
      >
        <div
          key="icon1"
          className="desktop-icon"
          onContextMenu={handleRightClickOnIcon}
        >
          <img src={ThisPcIcon} className="icon-image" /> <p>This PC</p>
        </div>
      </ResponsiveGridLayout>
      {showIconOptions && (
        <div
          className="icon-option-menu"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <IconOptionMenu />
        </div>
      )}
    </div>
  );
}

export default Desktop;
