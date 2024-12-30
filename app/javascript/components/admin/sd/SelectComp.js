import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%', // Width of the control (the input box)
    borderRadius: 8, // Rounded corners
    fontSize: "14px", // Font size
    border: '0',
    outline: '1px solid #EAE9E9',
    boxShadow: "none",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f5f5f5",
    borderRadius: 8, // Rounded corners for the menu
    fontSize: "14px", // Font size in the menu
    outline: "none",
  }),
  option: (provided, state) => {
    return {
      ...provided,
      color: state.isSelected ? "white" : state.isFocused ? "#FF6D2F" : "black", // White text for selected or focused items 
      backgroundColor: state.isSelected ? "#FF6D2F" : state.isFocused ? "#EAE9E9" : "white", // White text for selected or focused items
      cursor: "pointer",
      padding: "10px",
      fontWeight: state.isSelected ? "normal" : "normal",
      outline: "none",
    };
  },
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#888",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#333",
  }),
};

const SelectComp = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      className='w-48 text-sm'
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Select...'}
      styles={customStyles}
    />
  );
};

export default SelectComp;
