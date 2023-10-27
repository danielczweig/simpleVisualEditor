import React, { useRef, useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import ActionArea from "./action/ActionArea.js";
import EditArea from "./action/EditArea.js";
import LayoutArea from "./layout/LayoutArea.js";
import SaveLayout from "./action/SaveLayout.js";

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
  const [showModal, setShowModal] = useState(false);

  let layoutId = useRef(uuidv4())
  let savedLayouts = useRef([])

  const handleSave = () => {
    const index = savedLayouts.current.findIndex((layout) => layout.id === layoutId.current)
    if (index < 0) {
      setShowModal(true)
    } else {
      saveChanges(index);
    }
  }

  const saveChanges = (index, name) => {
    const prevRecord = savedLayouts.current[index];
    const newRecord = {
      id: layoutId.current,
      name: name || prevRecord.name,
      layout: cells,
    };

    if (savedLayouts.current.length === 0) {
      savedLayouts.current = [newRecord];
    } else {
      //remove prevRecord from savedLayouts
      let _savedLayouts = [...savedLayouts.current];
      _savedLayouts.splice(index, 1);
  
      // save newRecord as first position in _savedLayouts
      _savedLayouts.splice(0, 0, newRecord);
      savedLayouts.current = _savedLayouts;
    }
  }

  return (
    <>
      <ActionArea 
        handleSave={handleSave}
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
      {showModal &&
        <SaveLayout 
          saveChanges={saveChanges}
          saveIndex={savedLayouts.length}
          setShowModal={setShowModal}
        />
      }
    </>
  );
}

export default App;
