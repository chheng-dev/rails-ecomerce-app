import React from "react";

export default class TextAreaComp extends React.Component {
  render() {
    const { id, label, value, name, rows = 4, placeholder, onChange } = this.props;

    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          rows={rows}
          className="block w-full text-sm rounded-lg p-2.5 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-primary focus:border-primary"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    );
  }
}
