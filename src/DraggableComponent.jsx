import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ type, content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}
    >
      {content}
    </div>
  );
};

const Sidebar = ({ onDrop }) => {
  return (
    <div className="sidebar bg-secondary">
      <h3 className='text-white mb-4 text-start'>
        BLOCKS
      </h3>
      <DraggableComponent type="label" content="Label" />
      <DraggableComponent type="input" content="Input" />
      <DraggableComponent type="button" content="Button" />
    </div>
  );
};

export default Sidebar;
