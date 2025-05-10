/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./desktop.css";
import ThisPcIcon from "../../assets/this-pc-icon.png";
import VSCodeIcon from "../../assets/vscode.svg";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider } from "react-grid-layout";
import IconOptionMenu from "./option-menus/icon-option-menu";
import ResizableWindow from "../resizable-template/resizable";

function Desktop() {
  const [maxRows, setMaxRows] = useState(7);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Changed ref to state for coordinates
  const [layout, setLayout] = useState([
    { i: "icon1", x: 0, y: 0, w: 1, h: 1 },
    { i: "icon2", x: 1, y: 0, w: 1, h: 1 },
  ]);
  const [showIconOptions, setShowIconOptions] = useState(false);
  const ResponsiveGridLayout = WidthProvider(GridLayout);

  const [appList, setAppList] = useState([
    {
      id: "this-pc",
      name: "This PC",
      icon: ThisPcIcon,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      show: false,
    },
    {
      id: "vscode",
      name: "Visual Studio Code",
      icon: VSCodeIcon,
      x: 0,
      y: 1,
      w: 1,
      h: 1,
      show: false,
    },
  ]);

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

  const openApp = (id) => {
    const randomTimeout = Math.random() * 2000;
    document.body.style.cursor = "wait";

    setTimeout(() => {
      let list = [...appList];
      list.find((app) => app.id === id).show = true;
      setAppList(list);
      document.body.style.cursor = "default";
    }, randomTimeout);
  };

  const closeApp = (id) => { 
    let list = [...appList];
    list.find((app) => app.id === id).show = false;
    setAppList(list);
  }

  return (
    <div className="desktop">
      <ResponsiveGridLayout
        className="grid-layout"
        cols={15}
        rowHeight={90}
        maxRows={maxRows}
        autoSize={false}
        compactType={null}
        preventCollision={true}
        isResizable={false}
        layout={appList.map((app, index) => ({
          i: app.id.toString(),
          x: app.x,
          y: app.y,
          w: app.w,
          h: app.h,
        }))}
        draggableCancel=".desktop-icon"
      >
        {appList.map((app) => (
          <div
            key={app.id}
            className="desktop-icon"
            onContextMenu={handleRightClickOnIcon}
            onDoubleClick={(e) => openApp(app.id)}
          >
            <div className="icon-container-desktop">
              <img src={app.icon} className="icon-image" alt={app.name} />
            </div>
            <p className="app-title">{app.name}</p>
          </div>
        ))}
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
      {appList.find((app) => app.id === "vscode").show && (
        <ResizableWindow id="vscode" onClose={closeApp}>
          <iframe
            src="https://github1s.com/Jayurp/side-chick"
            title="Embedded Website"
            className="vs-code-iframe"
          />
        </ResizableWindow>
      )}
    </div>
  );
}

export default Desktop;
