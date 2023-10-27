import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import ActionArea from "./action/ActionArea.js";
import EditArea from "./action/EditArea.js";
import LayoutArea from "./layout/LayoutArea.js";

const App = () => {
  const gridCols = 128
  const gridRows = 256

  const canvasStyles = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }

  const [editView, setEditView] = useState("Pallet");
  const [cells, setCells] = useState([
    { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
  ]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [splitCell, setSplitCell] = useState(null);

  return (
    <>
      <ActionArea 
        setEditView={setEditView}
      />
      <div style={canvasStyles}>
        <LayoutArea 
          cells={cells}
          gridCols={gridCols}
          selectedCell = {selectedCell}
          setCells={setCells}
          setEditView={setEditView}
          setSelectedCell={setSelectedCell}
          setSplitCell={setSplitCell}
          splitCell = {splitCell}
        />
        <EditArea
          cells={cells} 
          editView={editView}
          gridCols={gridCols}
          gridRows={gridRows}
          selectedCell={selectedCell}
          setCells={setCells}
          setSelectedCell={setSelectedCell}
          setSplitCell={setSplitCell}
        />
      </div>
    </>
  );
}

export default App;
