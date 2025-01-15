import React from "react";

export default class TextFieldComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      required: props.required,
      name: props.name,
      id: props.id,
      type: props.type,
      label: props.label,
      value: props.value || '',
      placeholder: props.placeholder || ''
    }
  }

  render() {
    const { id, label, value, name, type, required, placeholder } = this.state;
    return (
      <div>
        <label htmlFor={name} className="text-gray-400 text-sm mb-2 block">{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          className="focus:ring-primary focus:border-primary bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
          required={required}
          placeholder={placeholder}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}