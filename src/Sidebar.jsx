import React from 'react';
import { useDrag } from 'react-dnd';

const Sidebar = ({ components, isDropped }) => {
  const renderComponent = (component) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: component.type,
      item: component,
    }));

    const opacity = isDragging ? 0.5 : 1;

    return (
      <div key={component.type} ref={drag} draggable={!isDropped(component.type)} style={{ opacity }}>
        {component.content}
      </div>
    );
  };

  return (
    <div>
      {components.map(renderComponent)}
    </div>
  );
};

export default Sidebar;
