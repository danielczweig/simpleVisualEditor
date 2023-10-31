import React from "react";

import LayoutCell from "./LayoutCell.js"

const LayoutArea = ({ cells, gridCols, handleDropImage, handleSwapContent, selectedCell, setCells, setEditView, setSelectedCell, setSplitCell, splitCell }) => {
  const layoutAreaStyles = {
    minHeight: "75%",
    width: "50%",
    maxWidth: "30rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "6rem",
    display: "grid",
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gridAutoFlow: "dense",
    girdAutoRows: "1fr",
    border: "3px solid black"
  };

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
            handleDropImage={handleDropImage}
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
