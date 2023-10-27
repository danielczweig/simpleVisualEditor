import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";


const ActionArea = ({ handleSave, setEditView, setShowLoad }) => {
  const actionAreaStyles = {
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
          <DropdownButton variant="light" title="Settings">
            <Dropdown.Item onClick={handleSave}>Save Layout</Dropdown.Item>
            <Dropdown.Item onMouseEnter={() => setShowLoad(true)}>Load Layout</Dropdown.Item>
          </DropdownButton>
        </Col>
        <ButtonGroup style={{maxWidth: "20%", padding: ".5rem", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}>
          <Button variant="secondary" style={actionAreaButtonStyles} onClick={() => setEditView("Pallet")}>
            Pallet
          </Button>
          <Button variant="secondary" style={actionAreaButtonStyles} onClick={() => setEditView("Layout")}>
            Layout
          </Button>
        </ButtonGroup>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ActionArea;
