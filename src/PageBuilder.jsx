import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid } from '@mui/material'; // Material UI Grid for layout (optional)

import Sidebar from './Sidebar';
import DraggableComponent from './DraggableComponent';

const PageBuilder = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const handleDrop = (item, monitor) => {
    const deltaX = monitor.getInitialClientOffset().x - monitor.getClientOffset().x;
    const deltaY = monitor.getInitialClientOffset().y - monitor.getClientOffset().y;

    const newComponent = {
      ...item,
      x: monitor.getClientOffset().x,
      y: monitor.getClientOffset().y,
      style: {
        transform: `translate(${deltaX}px, ${deltaY}px)`,
      },
    };

    setDroppedComponents([...droppedComponents, newComponent]);
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
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Sidebar components={components} isDropped={isDropped} />
        </Grid>
        <Grid item xs={9} style={{ border: '1px solid #ddd', padding: 20 }}>
          {droppedComponents.map((component) => (
            <DraggableComponent key={component.type} type={component.type} content={component.content} style={component.style} />
          ))}
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default PageBuilder;
