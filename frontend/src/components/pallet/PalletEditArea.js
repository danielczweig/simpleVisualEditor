import React from "react";

import PalletItem from "./PalletItem";

import Stack from "react-bootstrap/Stack";


// TODO: replace with functionality to add photos
const imageSrcList = [
    "https://images.pexels.com/photos/2894205/pexels-photo-2894205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2907428/pexels-photo-2907428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const palletEditAreaStyles = {
    maxWidth: "15rem",
    maxHeight: "80vh",
    padding: "1rem",
    overflowX: "hidden"
};

const headerStyles = {
    display: "flex", 
    justifyContent: "center", 
    marginBottom: "1rem"
}

const PalletEditArea = ({ setSelectedCell }) => {
    return (
        <div 
            style={palletEditAreaStyles}
        >
            <div style={headerStyles}>Pallet Editor</div>
            <Stack gap={3}>
                {imageSrcList.map((imageSrc, index) => (
                    <PalletItem
                        key={index}
                        imageSrc={imageSrc}
                        index={index}
                        setSelectedCell={setSelectedCell}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default PalletEditArea;
