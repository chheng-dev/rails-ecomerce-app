import React from "react";

export default class ButtonComp extends React.Component {
  render() {
    const { title, type = "button", link, onClick, bgColor = "bg-primary" } = this.props;

    if (link) {
      return (
        <a
          href={link}
          className={`text-white py-2 px-4 text-sm rounded-lg mt-[8px] inline-block ${bgColor}`}
        >
          {title}
        </a>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        className={`text-white py-2 px-4 text-sm rounded-lg mt-[8px] w-full ${bgColor}`}
      >
        {title}
      </button>
    );
  }
}
