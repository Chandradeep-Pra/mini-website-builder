import React from 'react';
import { useDrag } from 'react-dnd'; // Import useDrag hook

const SidebarItem = ({ type, onDrop }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({ // Use useDrag hook
    type,
    item: () => ({ type }), // Data to be passed on drop
  }));

  const handleDrop = (event) => {
    const monitor = event.dataTransfer || event.nativeEvent.dataTransfer;
    const deltaX = monitor.getClientOffset().x - dragRef.current.getBoundingClientRect().left;
    const deltaY = monitor.getClientOffset().y - dragRef.current.getBoundingClientRect().top;

    const newComponent = {
      type,
      x: monitor.getClientOffset().x,
      y: monitor.getClientOffset().y,
      config: {}, // Initial configuration for modal
      style: {
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
    };

    onDrop(newComponent); // Call provided onDrop function
  };

  return (
    <div
      ref={dragRef}
      draggable={!isDragging}
      className={`sidebar-item ${isDragging ? 'dragging' : ''}`}
      onClick={handleDrop}
      onMouseEnter={() => document.body.style.setProperty('--sidebar-item-hover-size', '1.2em')}
      onMouseLeave={() => document.body.style.setProperty('--sidebar-item-hover-size', '1em')}
    >
      <span className="sidebar-item-text">{type}</span>
    </div>
  );
};

const Sidebar = ({ components, onDrop }) => {
  return (
    <div className="sidebar">
      {components.map((component) => (
        <SidebarItem key={component} type={component} onDrop={handleDrop} />
      ))}
    </div>
  );
};

export default Sidebar;
