import React from "react";

import LayoutCell from "./LayoutCell";

const layoutAreaStyles = {
  height: "75%",
  width: "25%",
  maxWidth: "720px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "5%",
};

const LayoutArea = ({ setEditView, cells }) => {

  return (
    <div
      style={layoutAreaStyles}
      onClick={() => setEditView("Layout")}
    >
      {cells.map((cell) => (
        <LayoutCell
          key={cell.id}
          id={cell.id}
          width={cell.width}
          height={cell.height}
        />
      ))}
    </div>
  );
};

export default LayoutArea;
