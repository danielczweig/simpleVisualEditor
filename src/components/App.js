import React, { useEffect, useRef, useState } from "react";

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
  let layout = useRef(cells)

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
      layout: layout.current,
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
    layout.current = loadItem.layout;
    setShowLoad(false);
  }

  const handleNewLayout = () => {
    const newCells = [   
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    ]
    setCells(newCells);
    layout.current = newCells;
    layoutId.current = uuidv4();
  }

  const handleClearLayout = () => {
    const newCells = [   
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
      { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null },
    ]
    setCells(newCells);
    layout.current = newCells;
  }

  const handleDropImage = (item, id) => {
    const updatedCells = layout.current.map((cell) => cell);
    const dropIndex = updatedCells.findIndex((cell) => cell.id === id);
    updatedCells[dropIndex].src = item.imageSrc;

    setCells(updatedCells)
    layout.current = updatedCells;
  }
  
  const handleSwapContent = (dragId, dropId) => {

    // Create a deep copy of the cells array to avoid modifying the state directly.
    const updatedCells = layout.current.map((cell) => cell);

    const dragIndex = updatedCells.findIndex((cell) => cell.id === dragId);
    const dropIndex = updatedCells.findIndex((cell) => cell.id === dropId);

    if (dragIndex !== -1 && dropIndex !== -1) {
      // Swap the src property between the two cells.
      const dragSrc = updatedCells[dragIndex].src;
      updatedCells[dragIndex].src = updatedCells[dropIndex].src;
      updatedCells[dropIndex].src = dragSrc;

      // Set the updated cells array to the state.
      setCells(updatedCells);
      layout.current = updatedCells;
      setSelectedCell(null);
    }
  }

  const handleVerticalSplit = (selectedCell) => {
    const updatedCells = cells.flatMap((cell) => {
      if (cell.id === selectedCell.id) {
        const splitWidth = cell.w / 2;
        const newCell1 = { id: uuidv4(), w: splitWidth, h: cell.h, src: selectedCell.src };
        const newCell2 = { id: uuidv4(), w: splitWidth, h: cell.h, src: selectedCell.src };
        return [newCell1, newCell2];
      }
      return cell;
    });

    setCells(updatedCells);
    layout.current = updatedCells;
  };

  const handleHorizontalSplit = (selectedCell) => {

      let colsAvailable = gridCols;
      let newCell2 = null;
      let placedFirstCell = false;

      const updatedCells = cells.flatMap((cell, i, arr) => {
        if (cell.id === selectedCell.id) {
          const splitHeight = cell.h / 2;
          const newCell1 = { id: uuidv4(), w: cell.w, h: splitHeight, src: selectedCell.src };
          newCell2 = { id: uuidv4(), w: cell.w, h: splitHeight, src: selectedCell.src };

          if (i === arr.length - 1) return [newCell1, newCell2];
          placedFirstCell = true;
          colsAvailable -= newCell1.w;
          if (colsAvailable <= 0) colsAvailable = gridCols;
          return newCell1;
        } else if (placedFirstCell && colsAvailable === gridCols) {
          placedFirstCell = null;
          return [newCell2, cell]
        } else {
          colsAvailable -= cell.w;
          if (colsAvailable <= 0) colsAvailable = gridCols;
          return cell;
        }
      });
    
      setCells(updatedCells);
      layout.current = updatedCells
  };

  useEffect(() => {
    if(!splitCell) return;
    if(!selectedCell) return;
    
    if(splitCell === "vertical") handleVerticalSplit(selectedCell)
    if(splitCell === "horizontal") handleHorizontalSplit(selectedCell)
    
    setSplitCell(null);
    setSelectedCell(null);
    // eslint-disable-next-line
  }, [splitCell]);

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
          handleDropImage={handleDropImage}
          handleSwapContent={handleSwapContent}
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
