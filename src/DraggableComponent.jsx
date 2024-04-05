import React, { useRef, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

const DraggableComponent = ({ type, content, style, onDrop }) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [{}, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item, monitor) => {
      onDrop(item, monitor);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    setIsDragging(isDragging);
    if (isDragging) {
      ref.current.style.opacity = 0.5;
    } else {
      ref.current.style.opacity = 1;
    }
  }, [isDragging]);

  return (
    <div ref={drop(ref)} style={{ ...style, cursor: 'pointer' }}>
      <div ref={ref}>
        {content}
      </div>
    </div>
  );
};

export default DraggableComponent;
