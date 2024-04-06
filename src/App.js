import React, { useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PageBuilder from './PageBuilder';

const App = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  // Define the function to add a new component
  const handleAddComponent = (newComponent) => {
    setDroppedComponents([...droppedComponents, newComponent]);
  };

  return (
    <div className="App">
      {/* Pass the onAddComponent function as a prop */}
      <PageBuilder onAddComponent={handleAddComponent} />
    </div>
  );
};

export default App;
