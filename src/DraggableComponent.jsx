import React from 'react';
import { useDrop } from 'react-dnd';

const DraggableComponent = ({ type, content, style, onDrop }) => {
  // Use useDrop hook to handle drop events on the component
  const [{ isDragging }, drop] = useDrop(() => ({
    accept: ANY, // Accept any draggable type (can be customized)
    drop: onDrop, // Custom drop handler function (optional)
  }));

  const opacity = isDragging ? 0.5 : 1;
  const cursor = isDragging ? 'grabbing' : 'grab';

  const componentStyle = {
    position: 'absolute',
    ...style,
    opacity,
    cursor,
  };

  switch (type) {
    case 'label':
      return <label style={componentStyle}>{content}</label>;
    case 'input':
      return <input type="text" style={componentStyle} value={content} />;
    case 'button':
      return <button style={componentStyle}>{content}</button>;
    default:
      return null; // Handle unknown types gracefully
  }
};

export default DraggableComponent;
