import React, { useState } from "react";

const LayoutCell = ({ id, onSplitCell }) => {
  const [isSplit, setIsSplit] = useState(false);

  const handleSplitCell = () => {
    onSplitCell(id, !isSplit); // Pass the cell ID and whether to split horizontally or vertically
    setIsSplit(!isSplit);
  };

  const cellStyles = {
    width: "100%",
    height: "25%",
    border: "1px solid #000",
  };

  return (
    <div className={`cell ${isSplit ? "split" : ""}`} style={cellStyles}>
      {isSplit ? (
        <div className="split-buttons">
          <button onClick={() => handleSplitCell()}>Split Horizontally</button>
          <button onClick={() => handleSplitCell()}>Split Vertically</button>
        </div>
      ) : (
        <div className="cell-content">
          {/* Render cell content (e.g., dropped images) */}
        </div>
      )}
    </div>
  );
};

export default LayoutCell;
