import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";

const ActionArea = ({ handleNewLayout, handleSave, layoutId, savedLayouts, setEditView, setSelectedCell, setShowLoad }) => {
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

  const getLayoutName = () => {
    const index = savedLayouts.findIndex((layout) => layout.id === layoutId);

    if (index === -1) return "New Layout";

    return savedLayouts[index].name;
  }

  return (
    <Container fluid style={actionAreaStyles} onClick={() => setShowLoad(false)}>
      <Row className="align-items-center">
        <Col>
          <Row className="align-items-center">
            <Col sm={2}>
              <DropdownButton variant="light" title="Settings">
                <Dropdown.Item onClick={handleNewLayout}>New Layout</Dropdown.Item>
                <Dropdown.Item onClick={handleSave}>Save Layout</Dropdown.Item>
                <Dropdown.Item onMouseEnter={() => setShowLoad(true)}>Load Layout</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <div style={{borderLeft: "2px solid #6C757D", paddingLeft: "1.5rem", color: "#6C757D"}}>{getLayoutName()}</div>
            </Col>
          </Row>
        </Col>
        <ButtonGroup style={{maxWidth: "20%", padding: ".5rem", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}} onClick={() => setSelectedCell(null)}>
          <Button variant="secondary" style={actionAreaButtonStyles} onClick={() => setEditView("Pallet")}>
            Pallet
          </Button>
          <Button variant="secondary" style={actionAreaButtonStyles} onClick={() => setEditView("Layout")}>
            Layout
          </Button>
        </ButtonGroup>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionArea;
