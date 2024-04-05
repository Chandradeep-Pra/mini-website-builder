import React from 'react';

const Sidebar = ({ components }) => {
  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(component));
  };

  const renderComponent = (component) => (
    <div
      key={component.type}
      className="d-flex align-items-center justify-content-between p-2 rounded-lg bg-creamish text-black mb-2"
      draggable
      onDragStart={(event) => handleDragStart(event, component)}
    >
      {component.content}
    </div>
  );

const Sidebar = ({ components, onDrop }) => {
  return (
    <div className="sidebar bg-secondary">
      <h3 className='text-white mb-4 text-start'>
        BLOCKS
      </h3>
      {components.map(renderComponent)}
    </div>
  );
};

export default Sidebar;
