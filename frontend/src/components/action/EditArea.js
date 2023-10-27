import React from "react";

import LayoutEditArea from "../layout/LayoutEditArea.js";
import PalletEditArea from "../pallet/PalletEditArea.js";

const actionAreaStyles = {
  position: "fixed",
  marginLeft: "1rem",
  left: 0,
  top: "10%",
}

const EditArea = ({ editView, gridCols, gridRows, setCells, setSelectedCell, setSplitCell }) => {
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
          gridCols={gridCols}
          gridRows={gridRows}
          setCells={setCells}
          setSplitCell={setSplitCell}
        />
      }
    </div>
  );
}

export default EditArea;
