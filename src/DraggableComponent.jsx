import React from 'react';
import { useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Optional: Specify backend

const DraggableComponent = ({ type, ...props }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: () => ({ type }), // Data to be passed on drop
  }));

  const handleDrop = (event) => {
    const monitor = event.dataTransfer || event;
    // Optional: Calculate delta values for positioning
    const deltaX = monitor.getClientOffset().x - dragRef.current.getBoundingClientRect().left;
    const deltaY = monitor.getClientOffset().y - dragRef.current.getBoundingClientRect().top;
    // Call function in HomePage.jsx to handle dropped component
    props.onDrop(type, deltaX, deltaY);
  };

  return (
    <div
      ref={dragRef}
      className={`draggable-component ${isDragging ? 'dragging' : ''}`}
      draggable={!isDragging}
      {...props}
      onClick={handleDrop} // Attach handleDrop to onClick
    >
      {/* Your component content (Label, Input, Button) */}
      {type === 'Label' && <label>My Label</label>}
      {type === 'Input' && <input type="text" />}
      {type === 'Button' && <button>Click Me</button>}
    </div>
  );
};

export default DraggableComponent;
