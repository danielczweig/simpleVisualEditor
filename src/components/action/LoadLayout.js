import React from "react";

import ListGroup from 'react-bootstrap/ListGroup';

const LoadLayout = ({ handleLoad, layoutId, savedLayouts, setShowLoad }) => {
    const loadLayoutStyles = {
        position: "fixed",
        marginLeft: "1rem",
        left: 160,
        top: 80,
        width: "15rem",
        backgroundColor: "white",
        padding: "1rem",
        border: "1px solid #000",
        zIndex: 150,
    }

    return (
        <div style={loadLayoutStyles} onMouseLeave={() => setShowLoad(false)}>
            <ListGroup >
                {savedLayouts.map((layout, i) => (
                    <ListGroup.Item 
                        disabled={layout.id === layoutId}
                        onClick={() => handleLoad(i)}
                        action
                    >
                        {`${layout.name}${layout.id === layoutId ? " (Current)" : ""}`}
                    </ListGroup.Item>
                ))}
                {savedLayouts.length === 0 &&
                    <div onClick={() => setShowLoad(false)}>No Layouts Saved</div>
                }
            </ListGroup>
        </div>
    );
}

export default LoadLayout;
