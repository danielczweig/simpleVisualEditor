import React, { useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import ActionArea from "./action/ActionArea.js";
import EditArea from "./action/EditArea.js";
import LayoutArea from "./layout/LayoutArea.js";
import SaveLayout from "./action/SaveLayout.js";
import LoadLayout from "./action/LoadLayout.js";

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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);

  let layoutId = useRef(uuidv4())
  let savedLayouts = useRef([])

  const handleSave = () => {
    const index = savedLayouts.current.findIndex((layout) => layout.id === layoutId.current)
    if (index < 0) {
      setShowSaveModal(true)
    } else {
      saveChanges(index, false);
    }
  }

  const saveChanges = (index, newLayout, name) => {
    const prevRecord = savedLayouts.current[index];
    const newRecord = {
      id: layoutId.current,
      name: name || prevRecord.name,
      layout: cells,
    };

    if (savedLayouts.current.length === 0) {
      savedLayouts.current = [newRecord];
    } else if (newLayout) {
      savedLayouts.current = [newRecord, ...savedLayouts.current];
    } else {
      //remove prevRecord from savedLayouts
      let _savedLayouts = [...savedLayouts.current];
      _savedLayouts.splice(index, 1);
  
      // save newRecord as first position in _savedLayouts
      _savedLayouts.splice(0, 0, newRecord);
      savedLayouts.current = _savedLayouts;
    }
  }

  const handleLoad = (index) => {
    const loadItem = savedLayouts.current[index];

    //remove prevRecord from savedLayouts
    let _savedLayouts = [...savedLayouts.current];
    _savedLayouts.splice(index, 1);

    // save newRecord as first position in _savedLayouts
    _savedLayouts.splice(0, 0, loadItem);
    savedLayouts.current = _savedLayouts;

    layoutId.current = loadItem.id;
    setCells(loadItem.layout);
    setShowLoad(false);
  }

  const handleNewLayout = () => {
    setCells([   
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    ]);
    layoutId.current = uuidv4();
  }

  const handleClearLayout = () => {
    setCells([   
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    ]);
  }

  return (
    <>
      <ActionArea 
        handleNewLayout={handleNewLayout}
        handleSave={handleSave}
        layoutId={layoutId.current}
        savedLayouts={savedLayouts.current}
        setEditView={setEditView}
        setSelectedCell={setSelectedCell}
        setShowLoad={setShowLoad}
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
          handleClearLayout={handleClearLayout}
          selectedCell={selectedCell}
          setCells={setCells}
          setShowLoad={setShowLoad}
          setSelectedCell={setSelectedCell}
          setSplitCell={setSplitCell}
        />
      </div>
      {showSaveModal &&
        <SaveLayout 
          saveChanges={saveChanges}
          saveIndex={savedLayouts.length}
          setShowModal={setShowSaveModal}
        />
      }
      {showLoad &&
        <LoadLayout 
          handleLoad={handleLoad}
          layoutId={layoutId.current}
          savedLayouts={savedLayouts.current}
          setShowLoad={setShowLoad}
        />
      }
    </>
  );
}

export default App;
