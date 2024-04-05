import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DraggableComponent from './DraggableComponent';

const PageBuilder = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [droppedComponent, setDroppedComponent] = useState(null);

  const handleDrop = (event, component) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setDroppedComponent({ ...component, x: clientX, y: clientY });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDroppedComponent(null);
  };

  const handleSaveConfiguration = (x, y) => {
    setDroppedComponent({ ...droppedComponent, x, y });
    setShowModal(false);
    setDroppedComponents([...droppedComponents, droppedComponent]);
  };

  const isDropped = (type) =>
    droppedComponents.some((component) => component.type === type);

  const components = useMemo(() => [
    { type: 'label', content: 'Label' },
    { type: 'input', content: 'Input' },
    { type: 'button', content: 'Button' },
  ], []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex flex-column vh-100" style={{ zIndex: 0 }}>
        <div className="d-flex flex-grow-1  overflow-auto" style={{ backgroundColor: "#72A0C1", zIndex: 1 }}>
          {droppedComponents.map((component, index) => (
            <DraggableComponent
              key={index}
              type={component.type}
              content={component.content}
              style={component.style}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <Sidebar components={components} isDropped={isDropped}  />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Configure Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>X Coordinate: {droppedComponent && droppedComponent.x}</p>
          <p>Y Coordinate: {droppedComponent && droppedComponent.y}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={() => handleSaveConfiguration(droppedComponent.x, droppedComponent.y)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </DndProvider>
  );
};

export default PageBuilder;
