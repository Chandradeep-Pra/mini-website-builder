import React,{useState} from 'react';

const ConfigModal = ({ component, onClose, onSave }) => {
  // Placeholder for component-specific configuration options
  const [config, setConfig] = useState({});

  const handleSave = () => {
    onSave({ ...component, config }); // Merge component data with config
    onClose();
  };

  return (
    <div className="config-modal">
      <h2>Configure {component.type}</h2>
      {/* Replace with component-specific configuration fields */}
      <label>
        Text:
        <input type="text" value={config.text || ''} onChange={(event) => setConfig({ ...config, text: event.target.value })} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ConfigModal;
