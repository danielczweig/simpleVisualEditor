import React from "react";

import LayoutSection from "./LayoutSection";

const layoutAreaStyles = {
  height: "75%",
  width: "25%",
  maxWidth: "720px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "5%",
};

const LayoutArea = ({ sections, selectedCell, setEditView, setSelectedCell, setSplitCell, splitCell }) => {

  return (
    <div
      style={layoutAreaStyles}
      onClick={() => setEditView("Layout")}
    >
        {sections.map((section) => (
          <LayoutSection
            key={section.id}
            id={section.id}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            setSplitCell={setSplitCell}
            splitCell={splitCell}
          />
        ))}
    </div>
  );
};

export default LayoutArea;
