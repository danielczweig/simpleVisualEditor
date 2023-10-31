import React from "react";

import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const layoutEditAreaStyles = {
    padding: "1rem",
};

const headerStyles = {
  display: "flex", 
  justifyContent: "center", 
  marginBottom: "1rem"
}

const LayoutEditArea = ({ gridCols, gridRows, handleClearLayout, layout, setCells, setSplitCell, updateLayoutRef }) => {

  const addNewCell = () => {
    const newCell = { id: uuidv4(), w: gridCols, h: gridRows / 4, src: null };
    const updatedCells = [...layout, newCell]
    setCells(updatedCells);
    updateLayoutRef(updatedCells);
  };

  const splitCell = (splitDir) => {
    setSplitCell(splitDir)
  }
  
  return (
    <div style={layoutEditAreaStyles}>
      <div style={headerStyles}>Layout Editor</div>
        <Stack gap={3}>
          <Button variant="secondary" onClick={() => handleClearLayout()}>Clear Layout</Button>
          <Button variant="secondary" onClick={() => addNewCell()}>Add Cell</Button>
          <Button variant="secondary" onClick={() => splitCell("vertical")}>Split Cell Vertically</Button>
          <Button variant="secondary" onClick={() => splitCell("horizontal")}>Split Cell Horizontally</Button>
        </Stack>
    </div>
  );
};

export default LayoutEditArea;
