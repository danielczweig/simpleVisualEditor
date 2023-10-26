import React from "react";

import LayoutEditArea from "../layout/LayoutEditArea.js";
import PalletEditArea from "../pallet/PalletEditArea.js";

const actionAreaStyles = {
  position: "fixed",
  marginLeft: "1rem",
  left: 0,
  top: "10%",
}

const EditArea = ({ sections, editView, setSections, setSelectedCell, setSplitCell }) => {
  return (
    <div 
      style={actionAreaStyles}
    >
      {editView === null && null}
      {editView === "Pallet" && 
        <PalletEditArea 
          setSelectedCell={setSelectedCell}
        />
      }
      {editView === "Layout" && 
        <LayoutEditArea
          sections={sections} 
          setSections={setSections}
          setSplitCell={setSplitCell}
        />
      }
    </div>
  );
}

export default EditArea;
