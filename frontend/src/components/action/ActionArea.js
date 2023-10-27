import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";


const ActionArea = ({ handleSave, setEditView, setShowLoad }) => {
  const actionAreaStyles = {
    backgroundColor: "gray",
    padding: "1rem",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
  };
  
  const actionAreaButtonStyles = {
    marginLeft: ".5rem",
    marginRight: ".5rem",
  }


  return (
    <Container fluid style={actionAreaStyles} onClick={() => setShowLoad(false)}>
      <Row className="align-items-center">
        <Col>
          <DropdownButton title="Settings">
            <Dropdown.Item onClick={handleSave}>Save Layout</Dropdown.Item>
            <Dropdown.Item onMouseEnter={() => setShowLoad(true)}>Load Layout</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col className="text-center">
          <Button variant="primary" style={actionAreaButtonStyles} onClick={() => setEditView("Pallet")}>
            Picture
          </Button>
          <Button variant="primary" style={actionAreaButtonStyles} onClick={() => setEditView("Layout")}>
            Layout
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ActionArea;
