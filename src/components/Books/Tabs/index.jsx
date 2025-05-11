import React, { useState } from "react";
import Tab from "./Tab";

const Tabs = () => {
  const [hoveredTab, setHoveredTab] = useState();
  return (
    <div className="flex rounded-full border-2 border-yellow-800 overflow-scroll scroll-hidden mb-5 ">
      <Tab
        to="/books"
        text="All"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      />
      <Tab
        to="/books/english"
        text="English"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      />
      <Tab
        to="/books/arabic"
        text="Arabic"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      />
      <Tab
        to="/books/kids"
        text="Kids"
        hoveredTab={hoveredTab}
        setHoveredTab={setHoveredTab}
      />
    </div>
  );
};

export default Tabs;
