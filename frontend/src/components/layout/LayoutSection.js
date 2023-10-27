import React, { useCallback, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import LayoutCell from "./LayoutCell.js"

const gridCols = 256
const gridRows = 128

const sectionStyles = {
    height: "25%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gridTemplateRows: `repeat(${gridRows}, 1fr)`,
};

const LayoutSection = ({ id, handleSwapContent, selectedCell, setSections, setSelectedCell, setSplitCell, splitCell }) => {
    const [cells, setCells] = useState([
        { id: uuidv4(), sectionId: id, w: gridCols, h: gridRows, src: null },
    ])

    const handleVerticalSplit = (selectedCell) => {
        const updatedCells = cells.flatMap((cell) => {
          if (cell.id === selectedCell.id) {
            const splitWidth = cell.w / 2;
            const newCell1 = { id: uuidv4(), sectionId: id, w: splitWidth, h: cell.h, src: selectedCell.src };
            const newCell2 = { id: uuidv4(), sectionId: id, w: splitWidth, h: cell.h, src: selectedCell.src };
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
            const newCell1 = { id: uuidv4(), sectionId: id, w: cell.w, h: splitHeight, src: selectedCell.src };
            newCell2 = { id: uuidv4(), sectionId: id, w: cell.w, h: splitHeight, src: selectedCell.src };

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
        <div style={sectionStyles}>
            {cells.map((cell) => (
                <LayoutCell 
                    key={cell.id}
                    id={cell.id}
                    handleSwap={handleSwapContent}
                    height={cell.h}
                    width={cell.w}
                    sectionId={id}
                    selected={!selectedCell ? false : cell.id === selectedCell.id}
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    cellSrc={cell.src}
                />
            ))}
        </div>
    );
};

export default LayoutSection;