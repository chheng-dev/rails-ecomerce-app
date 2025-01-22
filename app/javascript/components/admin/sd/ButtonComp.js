import React from "react";

export default class ButtonComp extends React.Component {
  render() {
    const { title, type = "button", link, onClick } = this.props;

    if (link) {
      return (
        <a
          href={link}
          className="bg-primary text-white py-2 px-4 text-sm rounded-lg mt-[8px] inline-block"
        >
          {title}
        </a>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-primary text-white py-2 px-4 text-sm rounded-lg mt-[8px]"
      >
        {title}
      </button>
    );
  }
}
