import React, { useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import LayoutCell from "./LayoutCell.js"

const LayoutArea = ({ cells, gridCols, gridRows, selectedCell, setCells, setEditView, setSelectedCell, setSplitCell, splitCell }) => {
  const layoutAreaStyles = {
    minHeight: "75%",
    width: "50%",
    maxWidth: "30rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    display: "grid",
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
    border: "3px solid black"
  };
  
  const handleSwapContent = (dragId, dropId) => {
    // Create a deep copy of the cells array to avoid modifying the state directly.
    const updatedCells = cells.map((cell) => cell);

    const dragIndex = updatedCells.findIndex((cell) => cell.id === dragId);
    const dropIndex = updatedCells.findIndex((cell) => cell.id === dropId);

    if (dragIndex !== -1 && dropIndex !== -1) {
      // Swap the src property between the two cells.
      const dragSrc = updatedCells[dragIndex].src;
      updatedCells[dragIndex].src = updatedCells[dropIndex].src;
      updatedCells[dropIndex].src = dragSrc;

      // Set the updated cells array to the state.
      setCells(updatedCells);
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
  };

  const handleHorizontalSplit = (selectedCell) => {
      let newCell2 = null;
      let startCounter = false;
      let counter = gridCols;
    
      const updatedCells = cells.flatMap((cell, i, arr) => {
        if (cell.id === selectedCell.id) {
          const splitHeight = cell.h / 2;
          const newCell1 = { id: uuidv4(), w: cell.w, h: splitHeight, src: selectedCell.src };
          newCell2 = { id: uuidv4(), w: cell.w, h: splitHeight, src: selectedCell.src };

          // add the two new cells together if the split cell 
          // was the last position in the cells array.
          // otherwise, just add newCell1 to the array for now.
          if (i === arr.length - 1) return [newCell1, newCell2];
          counter -= cell.w;
          startCounter = true;
          return newCell1;
        } else {
          // We add newCell2 to the array once we've traversed 
          // enough column widths (gridCols - newCell1.w)
          if (startCounter) counter -= cell.w;
          if (counter === 0) return [cell, newCell2];
          return cell;
        }
      });
    
      setCells(updatedCells);
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
    <div
      style={layoutAreaStyles}
      onClick={() => setEditView("Layout")}
    >
        {cells.map((cell) => (
          <LayoutCell
            key={cell.id}
            id={cell.id}
            cells={cells}
            cellSrc={cell.src}
            handleSwap={handleSwapContent}
            height={cell.h}
            width={cell.w}
            selected={!selectedCell ? false : cell.id === selectedCell.id}
            selectedCell={selectedCell}
            setCells={setCells}
            setSelectedCell={setSelectedCell}
          />
        ))}
    </div>
  );
};

export default LayoutArea;
