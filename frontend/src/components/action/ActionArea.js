import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";

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

const ActionArea = ({ setEditView }) => {
  return (
    <Container fluid style={actionAreaStyles}>
      <Row className="align-items-center">
        <Col>
          <DropdownButton id="layout-dropdown" title="Settings">
            <Dropdown.Item>Save Layout</Dropdown.Item>
            <Dropdown.Item>Load Layout</Dropdown.Item>
            <Dropdown.Item>Select Layout</Dropdown.Item>
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
