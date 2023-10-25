import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

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
  const [cells, setCells] = useState([
    { id: uuidv4() },
    { id: uuidv4() },
    { id: uuidv4() },
    { id: uuidv4() },
  ]);

  return (
    <>
      <ActionArea 
        setEditView={setEditView}
      />
      <div style={canvasStyles}>
        <LayoutArea 
          setEditView={setEditView}
          cells={cells}
        />
        <EditArea
          cells={cells} 
          editView={editView}
          setCells={setCells}
        />
      </div>
    </>
  );
}

export default App;
