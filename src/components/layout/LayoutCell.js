import React from "react";
import { useDrag, useDrop } from 'react-dnd'

const LayoutCell = ({ id, cellSrc, handleDropImage, handleSwap, height, width, selected, setSelectedCell }) => {

  const cellStyles = {
    height: "100%",
    width: "100%",
    gridColumn: "span " + width,
    gridRow: "span " + height,
    backgroundImage: `url(${cellSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid black",
    cursor: "move",
  };
  
  // eslint-disable-next-line
  const [{isDragging}, drag] = useDrag(() => ({
    type: "cellContent",
    item: { id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "cellContent"],
    drop: (item) => handleDrop(item, id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleDrop = (item) => {
    const imageSrc = (item.imageSrc)
    const cellDragId = (item.id)
    
    if (imageSrc) handleDropImage(item, id)
    if (cellDragId) handleSwapContent(item)
  }

  const handleSwapContent = (item) => {
    const dragCellId = item.id;
    const dropCellId = id;

    handleSwap(dragCellId, dropCellId);
  }

  let dropOrSelectedStyles = {};
  if (isOver || selected) dropOrSelectedStyles = {
    border: "1px solid blue",
    backgroundColor: "blue",
    opacity: 0.5,
  }

  return (
    <div
      style={{...cellStyles, ...dropOrSelectedStyles}}
      ref={drop}
      onClick={() => setSelectedCell({id: id, src: cellSrc})}
      onMouseDown={() => setSelectedCell({id: id, src: cellSrc})}
    >
      {cellSrc &&
        <div 
          ref={drag} 
          style={{height: "100%", width: "100%"}}>
        </div>
      }
    </div>
  );
};

export default LayoutCell;
