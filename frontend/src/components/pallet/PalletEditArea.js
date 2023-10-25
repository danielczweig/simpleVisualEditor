import React from "react";

import PalletItem from "./PalletItem";

import Stack from "react-bootstrap/Stack";


// TODO: replace with functionality to add photos
const imageSrcList = [
    "https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg",
    "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2907428/pexels-photo-2907428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const palletEditAreaStyles = {
    maxWidth: "15rem",
    backgroundColor: "#eee",
    padding: "1rem",
    border: "1px solid #000",
};

const PalletEditArea = () => {
    return (
        <div style={palletEditAreaStyles}>
            <Stack gap={3}>
                {imageSrcList.map((imageSrc, index) => (
                    <PalletItem
                        key={index}
                        imageSrc={imageSrc}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default PalletEditArea;