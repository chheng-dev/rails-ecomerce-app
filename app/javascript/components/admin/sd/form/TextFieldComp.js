import React from "react";
import PropTypes from "prop-types";

export default class TextFieldComp extends React.Component {
  render() {
    const { id, label, value, name, type, required, placeholder, onChange, prefixIcon } = this.props;

    return (
      <div className="relative">
        {label && (
          <label htmlFor={name} className="text-gray-500 text-sm mb-2 block">
            {label} {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <span className="absolute left-3 text-gray-400 border-r border-gray-200 bg-gray-200 prefixIconClass rounded-l-md ">
              {prefixIcon}
            </span>
          )}

          <input
            type={type}
            id={id}
            name={name}
            value={value}
            className={`focus:ring-primary focus:border-primary bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg block min-w-full ${prefixIcon ? 'pl-12' : 'pl-3'} p-2.5 placeholder:text-gray-400 }`}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>

      </div >
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
