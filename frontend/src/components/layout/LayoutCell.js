import React, { useState } from "react";
import { useDrop } from 'react-dnd'

import Image from "react-bootstrap/Image";

const LayoutCell = ({ id, height, width, selected, setSelectedCell, src }) => {
  const [image, setImage] = useState(src)

  const cellStyles = {
    width: "100%",
    height: "100%",
    gridColumn: "span " + width,
    gridRow: "span " + height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "1px solid black",
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => handleImageDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleImageDrop = (item) => {
    const { imageSrc } = item
    setImage(imageSrc)
  }

  let dropOrSelectedStyles = {}
  if (isOver || selected) dropOrSelectedStyles = {
    border: "1px solid blue",
    backgroundColor: "blue",
    opacity: 0.5,
  }

  return (
    <div
      style={{...cellStyles, ...dropOrSelectedStyles}}
      ref={drop}
      onClick={() => setSelectedCell({id: id, src: image})}
    >
      {image &&
        <Image
          src={image} 
          alt="Image"
          fluid
        />
      }
    </div>
  );
};

export default LayoutCell;
