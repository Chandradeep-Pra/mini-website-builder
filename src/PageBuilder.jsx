import React, { useState, useMemo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import DraggableComponent from './DraggableComponent';

const PageBuilder = ({ onAddComponent }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');
  const [droppedComponents, setDroppedComponents] = useState([]);

  const handleDrop = (item, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.x - delta.x);
    const top = Math.round(item.y - delta.y);
    const newComponent = {
      id: Math.random().toString(36).substr(2, 9),
      type: item.type,
      content: item.content,
      x: left,
      y: top,
    };
    setDroppedComponents([...droppedComponents, newComponent]);
    setShowModal(true); // Show modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  const handleSaveConfiguration = () => {
    const updatedComponent = {
      ...selectedComponent,
      x: parseInt(xCoordinate),
      y: parseInt(yCoordinate),
    };
    onAddComponent(updatedComponent); // Call onAddComponent to add the new component
    setShowModal(false);
    setSelectedComponent(null);
    setXCoordinate('');
    setYCoordinate('');
  };

  const components = useMemo(() => [
    { type: 'label', content: 'Label' },
    { type: 'input', content: 'Input' },
    { type: 'button', content: 'Button' },
  ], []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex flex-column vh-100" style={{ zIndex: 0 }}>
        <div className="d-flex flex-grow-1  overflow-auto" style={{ backgroundColor: "#72A0C1", zIndex: 1 }}>
          {droppedComponents.map((component) => (
            <DraggableComponent
              key={component.id}
              type={component.type}
              content={component.content}
              x={component.x}
              y={component.y}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <Sidebar components={components} />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Configure Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>X Coordinate: {selectedComponent && selectedComponent.x}</p>
          <p>Y Coordinate: {selectedComponent && selectedComponent.y}</p>
          <input type="text" value={xCoordinate} onChange={(e) => setXCoordinate(e.target.value)} placeholder="X Coordinate" />
          <input type="text" value={yCoordinate} onChange={(e) => setYCoordinate(e.target.value)} placeholder="Y Coordinate" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveConfiguration}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </DndProvider>
  );
};

export default PageBuilder;
