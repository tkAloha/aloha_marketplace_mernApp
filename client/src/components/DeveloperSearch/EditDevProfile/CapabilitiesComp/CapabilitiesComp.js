import React from "react";

const CapabilitiesComp = ({
  label,
  capabilityName,
  capabilityValue,
  onCapabilitesChange,
  error,
}) => {
  return (
    <>
      <div className="input-field-row">
        <label htmlFor={capabilityName}>{label}</label>
        <input
          value={capabilityValue}
          onChange={onCapabilitesChange}
          name={capabilityName}
          type="number"
          id={capabilityName}
          placeholder="0"
          min="3"
          max="5"
        />
      </div>
      <div className="error-row">
        <p className="error">{error}</p>
      </div>
    </>
  );
};

export default CapabilitiesComp;
