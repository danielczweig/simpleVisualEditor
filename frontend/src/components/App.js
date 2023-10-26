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
  const [editView, setEditView] = useState("Pallet");
  const [sections, setSections] = useState([
    { id: uuidv4() },
    { id: uuidv4() },
    { id: uuidv4() },
    { id: uuidv4() },
  ]);
  const [selectedCell, setSelectedCell] = useState(null)
  const [splitCell, setSplitCell] = useState(null)

  return (
    <>
      <ActionArea 
        setEditView={setEditView}
      />
      <div style={canvasStyles}>
        <LayoutArea 
          sections={sections}
          selectedCell = {selectedCell}
          setEditView={setEditView}
          setSections={setSections}
          setSelectedCell={setSelectedCell}
          setSplitCell={setSplitCell}
          splitCell = {splitCell}
        />
        <EditArea
          sections={sections} 
          editView={editView}
          selectedCell={selectedCell}
          setSections={setSections}
          setSelectedCell={setSelectedCell}
          setSplitCell={setSplitCell}
        />
      </div>
    </>
  );
}

export default App;
