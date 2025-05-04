import React, { useState, useEffect } from "react";
import "./bar.css";
import AccordionIcon from "../../assets/accordion-arrow.svg";
import VolumeIcon from "../../assets/volume-icon.svg";
import BatteryIcon from "../../assets/battery-icon.svg";
import WifiIcon from "../../assets/wifi-icon.svg";
import WindowsIcon from "../../assets/windows-icon.svg";
import SearchIcon from "../../assets/search-icon.svg";

function Bar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = currentDate.toLocaleDateString("en-GB");

  const formattedDate = dateString.replace(/\//g, "-");

  return (
    <div className="task-bar">
      <div className="center-section">
        <img src={WindowsIcon} alt="Windows" className="windows-icon" />
        <div className="search-bar">
                  <img src={SearchIcon} alt="Search" className="search-icon" />
                  <p>Search</p>
        </div>
      </div>
      <div className="task-bar__icons">
        <img src={AccordionIcon} alt="Add Task" className="task-bar__icon" />
        <p className="language-selection">
          ENG <br /> US
        </p>
        <img src={WifiIcon} alt="WiFi" className="task-bar__icon" />
        <img src={VolumeIcon} alt="Volume" className="task-bar__icon" />
        <img src={BatteryIcon} alt="Battery" className="task-bar__icon" />
        <div className="time-strings">
          <p className="date-time">{timeString}</p>
          <p className="date-time">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default Bar;
