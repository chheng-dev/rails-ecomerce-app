import React from "react";
import PropTypes from "prop-types";

export default class TextFieldComp extends React.Component {
  render() {
    const { id, label, value, name, type, required, placeholder, onChange } = this.props;

    return (
      <div>
        {label && (
          <label htmlFor={name} className="text-gray-500 text-sm mb-2 block">
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          className="focus:ring-primary focus:border-primary bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
          required={required}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
}

TextFieldComp.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldComp.defaultProps = {
  type: "text",
  required: false,
  value: "",
  placeholder: "",
};
