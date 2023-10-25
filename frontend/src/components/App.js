import React, { useState } from "react";

import ActionArea from "./action/ActionArea.js";
import EditArea from "./action/EditArea.js";
import LayoutArea from "./layout/LayoutArea.js";

const canvasStyles = {
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const App = () => {
  const [editView, setEditView] = useState("Pallet")
  return (
    <>
      <ActionArea 
        setEditView={setEditView}
      />
      <div style={canvasStyles}>
        <LayoutArea 
          setEditView={setEditView}
        />
        <EditArea 
          editView={editView}
        />
      </div>
    </>
  );
}

export default App;
