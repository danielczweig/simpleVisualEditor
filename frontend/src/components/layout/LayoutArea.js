import React, { useState } from "react";
import { useDrop } from "react-dnd";
import LayoutCell from "./LayoutCell";

const layoutAreaStyles = {
  height: "75%",
  width: "25%",
  maxWidth: "720px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "5%",
  border: "1px solid #000",
}

const LayoutArea = ( {setEditView} ) => {
  const [cells, setCells] = useState([
    { id: 1, content: null },
    { id: 2, content: null },
    { id: 3, content: null },
    { id: 4, content: null }
  ]);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "IMAGE",
    drop: (item, monitor) => {
      // TODO: Handle the drop action here (e.g., swapping images or adding to a cell)
      // Access item.src to get the dropped image source
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  const handleAddCell = () => {
    const newCells = [
      ...cells,
      { id: cells.length + 1, content: null, width: 300, height: 200 },
    ];
    setCells(newCells);
  };

  const splitCell = (cellId, isHorizontal) => {
    const updatedCells = cells.map((cell) => {
      if (cell.id === cellId) {
        if (isHorizontal) {
          return {
            ...cell,
            height: cell.height / 2,
          };
        } else {
          return {
            ...cell,
            width: cell.width / 2,
          };
        }
      }
      return cell;
    });
    setCells(updatedCells);
  };

  return (
    <div className={`layout-area ${isActive ? "active" : ""}`} style={layoutAreaStyles} onClick={() => setEditView("Layout")}>
      {cells.map((cell) => (
        <LayoutCell
          ref={drop}
          key={cell.id}
          id={cell.id}
          content={cell.content}
          width={cell.width}
          height={cell.height}
          onSplitCell={splitCell}
        />
      ))}
    </div>
  );
};

export default LayoutArea;