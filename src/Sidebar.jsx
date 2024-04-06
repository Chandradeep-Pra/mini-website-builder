import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Sidebar = ({ components, onAddComponent }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');

  const handleOpenModal = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComponent(null);
    setXCoordinate('');
    setYCoordinate('');
  };

  const handleAddComponent = () => {
    const x = parseInt(xCoordinate);
    const y = parseInt(yCoordinate);
    if (!isNaN(x) && !isNaN(y)) {
      onAddComponent(selectedComponent, x, y);
      handleCloseModal();
    }
  };

  return (
    <div className="sidebar bg-secondary">
      <h3 className='text-white mb-4 text-start'>
        BLOCKS
      </h3>
      {components.map((component, index) => (
        <div
          key={index}
          className="sidebar-item d-flex align-items-center justify-content-between p-2 rounded-lg bg-creamish text-black mb-2"
          draggable="true" // Ensure draggable attribute is set to true
          onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(component))} // Set data on drag start
          onClick={() => handleOpenModal(component)}
        >
          {component.content}
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="xCoordinate">
              <Form.Label>X Coordinate</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter X Coordinate"
                value={xCoordinate}
                onChange={(e) => setXCoordinate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="yCoordinate">
              <Form.Label>Y Coordinate</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Y Coordinate"
                value={yCoordinate}
                onChange={(e) => setYCoordinate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddComponent}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
