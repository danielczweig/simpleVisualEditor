import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const SaveLayout = ({ saveChanges, saveIndex, setShowModal }) => {
  const backgroundStyles = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  }

  const modalStyles = {
    display: 'block', 
    position: 'fixed', 
    zIndex: 2000
  }

  const [value, setValue] = useState("")
  const [validated, setValidated] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    value.length > 0 ? setValidated(true) : setValidated(false);

    if (validated) {
        saveChanges(saveIndex, value);
        setShowModal(false);
        setValidated(null);
    }
  };

  return (
    <div 
    style={backgroundStyles}
    >
        <div
        className="modal show"
        style={modalStyles}
        >
        <Modal.Dialog>
            <Modal.Body>
                <Row style={{padding: "1rem"}}>
                    <label style={{marginBottom: ".5rem"}}>Name your layout</label>
                    <input 
                        type="text" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Masterpiece #11" 
                        name="username" 
                    />
                </Row>
                {validated === false &&
                    <div style={{marginLeft: ".5rem", color: "red"}}>Please enter a layout name</div>
                }
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={(e) => handleSubmit(e)}>Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
    </div>
  );
}

export default SaveLayout;