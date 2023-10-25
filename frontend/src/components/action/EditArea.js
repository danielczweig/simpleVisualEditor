import React from "react";

import LayoutEditArea from "../layout/LayoutEditArea.js";
import PalletEditArea from "../pallet/PalletEditArea.js";

const actionAreaStyles = {
  position: "fixed",
  marginLeft: "1rem",
  left: 0,
  top: "10%",
}

const EditArea = ( {editView} ) => {
  return (
    <div style={actionAreaStyles}>
        {editView === null && null}
        {editView === "Pallet" && <PalletEditArea />}
        {editView === "Layout" && <LayoutEditArea />}
    </div>
  );
}

export default EditArea;
