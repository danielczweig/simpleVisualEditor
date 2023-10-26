import React from "react";
import { useDrag } from "react-dnd";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

const palletItemStyles = {
  cursor: "move",
  objectFit: "contain",
  maxWidth: "100%",
}

const PalletItem = ({ imageSrc, setSelectedCell }) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "image",
    item: { imageSrc },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  if (isDragging) setSelectedCell(null)

  return (
    <Container>
        <Image
            ref={drag} 
            src={imageSrc} 
            alt="Pallet Item"
            style={{
              ...palletItemStyles,
              opacity: isDragging ? 0.5 : 1,
            }}
            rounded
        />
    </Container>
  );
};

export default PalletItem;
