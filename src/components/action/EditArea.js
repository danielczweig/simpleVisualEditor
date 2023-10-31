import React from "react";

import LayoutEditArea from "../layout/LayoutEditArea.js";
import PalletEditArea from "../pallet/PalletEditArea.js";

const EditArea = ({ editView, gridCols, gridRows, layout, handleClearLayout, setCells, setShowLoad, setSelectedCell, setSplitCell, updateLayoutRef }) => {
  const editAreaStyles = {
    position: "fixed",
    marginLeft: "1rem",
    left: 0,
    top: 0,
    marginTop: "6rem",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  }

  return (
    <div 
      style={editAreaStyles}
      onMouseEnter={() => setShowLoad(false)}
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
          handleClearLayout={handleClearLayout}
          layout={layout}
          setCells={setCells}
          setSplitCell={setSplitCell}
          updateLayoutRef={updateLayoutRef}
        />
      }
    </div>
  );
}

export default EditArea;
