import { useState } from 'react';

import Button from 'react-bootstrap/Button';
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

  const handleSubmit = (e) => {
    saveChanges(saveIndex, true, value);
    setShowModal(false);
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
                        placeholder="ex. Masterpiece #11" 
                        name="username" 
                    />
                </Row>
            </Modal.Body>

            <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
            >Close</Button>
            <Button 
              variant="primary" 
              onClick={(e) => handleSubmit(e)} 
              disabled={value.replace(/ /g, '').length === 0}
            >Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
    </div>
  );
}

export default SaveLayout;