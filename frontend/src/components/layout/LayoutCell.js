import React, { useState } from "react";
import { useDrop } from 'react-dnd'

import Image from "react-bootstrap/Image";

const LayoutCell = () => {
  const [image, setImage] = useState(null)

  const cellStyles = {
    width: "100%",
    height: "25%",
    border: "1px solid black",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  let dropStyles = {}
  if (isOver) dropStyles = {
    border: "1px solid blue",
    backgroundColor: "blue"
  }

  return (
    <div
      style={{...cellStyles, ...dropStyles}}
      ref={drop}
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
