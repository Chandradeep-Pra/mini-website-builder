import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { LocalStorage } from 'local-storage';

import Sidebar from './Sidebar';
import DraggableComponent from './DraggableComponent';
import ConfigModal from './ConfigModal';

const HomePage = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

//   // Load data from local storage on mount
//   useEffect(() => {
//     if (LocalStorage) {
//       const storedData = LocalStorage.getItem('droppedComponents');
//       if (storedData) {
//         setDroppedComponents(JSON.parse(storedData));
//       }
//     }
//   }, []);

  // Save data to local storage on change
  useEffect(() => {
    if (LocalStorage) {
      LocalStorage.setItem('droppedComponents', JSON.stringify(droppedComponents));
    }
  }, [droppedComponents]);

  const handleDrop = (item, monitor) => {
    const deltaX = monitor.getInitialClientOffset().x - monitor.getClientOffset().x;
    const deltaY = monitor.getInitialClientOffset().y - monitor.getClientOffset().y;

    const newComponent = {
      type: item,
      x: monitor.getClientOffset().x,
      y: monitor.getClientOffset().y,
      config: {}, // Initial configuration for modal
      style: {
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
    };

    setDroppedComponents([...droppedComponents, newComponent]);
    setShowConfigModal(true); // Open config modal after drop
  };

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    setShowConfigModal(true); // Open config modal on selection
  };

  const handleDeleteComponent = (component) => {
    setDroppedComponents(droppedComponents.filter((c) => c !== component));
  };

  const handleConfigModalSave = (updatedComponent) => {
    setDroppedComponents(
      droppedComponents.map((c) => (c === selectedComponent ? updatedComponent : c))
    );
    setSelectedComponent(null);
    setShowConfigModal(false);
  };

  const handleConfigModalClose = () => {
    setSelectedComponent(null);
    setShowConfigModal(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="home-page">
        <Sidebar components={['Label', 'Input', 'Button']} onDrop={handleDrop} />
        <div className="dropped-components">
          {droppedComponents.map((component) => (
            <DraggableComponent
              key={component.type}
              {...component}
              isSelected={component === selectedComponent}
              onSelect={handleSelectComponent}
              onDelete={handleDeleteComponent}
              onDrag={(event) => {
                // Update component position on drag (implementation example)
                const deltaX = event.movementX;
                const deltaY = event.movementY;
                setDroppedComponents(
                  droppedComponents.map((c) =>
                    c === component ? { ...c, style: { transform: `translate(${c.x + deltaX}px, ${c.y + deltaY}px)` } } : c
                  )
                );
              }}
              style={component.style}
            />
          ))}
        </div>
        {showConfigModal && (
          <ConfigModal
            component={selectedComponent}
            onClose={handleConfigModalClose}
            onSave={handleConfigModalSave}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default HomePage;
