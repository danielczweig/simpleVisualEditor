import React from "react";

import { v4 as uuidv4 } from "uuid";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const layoutEditAreaStyles = {
    backgroundColor: "#eee",
    padding: "1rem",
    border: "1px solid #000",
};

const LayoutEditArea = ({ setSections, setSplitCell }) => {

  const addNewCell = () => {
    const newSection = { id: uuidv4() };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  const splitCell = (splitDir) => {
    setSplitCell(splitDir)
  }
  
  return (
    <div style={layoutEditAreaStyles}>
      <Stack gap={3}>
        <Button variant="light" onClick={() => addNewCell()}>Add Cell</Button>
        <Button variant="light">Empty Cell</Button>
        <Button variant="light" onClick={() => splitCell("vertical")}>Split Cell Vertically</Button>
        <Button variant="light" onClick={() => splitCell("horizontal")}>Split Cell Horizontally</Button>
      </Stack>
    </div>
  );
};

export default LayoutEditArea;
