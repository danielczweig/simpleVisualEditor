import React from "react";

import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const layoutEditAreaStyles = {
    backgroundColor: "#eee",
    padding: "1rem",
    border: "1px solid #000",
};

const LayoutEditArea = ({ cells, setCells }) => {

  const addNewCell = () => {
    const newCell = { id: uuidv4() };
    setCells((prevCells) => [...prevCells, newCell]);
  };
  
  return (
    <div style={layoutEditAreaStyles}>
      <Stack gap={3}>
        <Button variant="light" onClick={() => addNewCell()}>Add Cell</Button>
        <Button variant="light">Empty Cell</Button>
        <Button variant="light">Split Cell Vertically</Button>
        <Button variant="light">Split Cell Horizontally</Button>
      </Stack>
    </div>
  );
};

export default LayoutEditArea;
