import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { useDrag } from "react-dnd";

const palletItemStyles = {
    maxWidth: "120px",
    height: "100%",
}

const PalletItem = ({ imageSrc }) => {
  const [, ref] = useDrag({
    type: "IMAGE", // The type that will be used in the drop target
    item: { src: imageSrc },
  });

  return (
    <Container className="pallet-item">
        <Image
            ref={ref} 
            src={imageSrc} 
            alt="Pallet Item"
            style={palletItemStyles}
            rounded
        />
    </Container>
  );
};

export default PalletItem;
