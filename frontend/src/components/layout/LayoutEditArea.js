import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const layoutEditAreaStyles = {
    backgroundColor: "#eee",
    padding: "1rem",
    border: "1px solid #000",
};

const LayoutEditArea = () => {
  return (
    <div style={layoutEditAreaStyles}>
      <Stack gap={3}>
        <Button variant="light">Add Cell</Button>
        <Button variant="light">Empty Cell</Button>
        <Button variant="light">Split Cell Vertically</Button>
        <Button variant="light">Split Cell Horizontally</Button>
      </Stack>
    </div>
  );
};

export default LayoutEditArea;
