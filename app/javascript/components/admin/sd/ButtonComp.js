import React from "react";

export default class ButtonComp extends React.Component {
  render() {
    const { title, type = "button", link, onClick, bgColor = "bg-primary", icon = '', } = this.props;

    if (link) {
      return (
        <a
          href={link}
          className={`text-white py-2 px-4 text-xs rounded-lg mt-[8px] inline-block ${bgColor}`}
        >
          <div className="flex items-center gap-1">
            {icon} {title}
          </div>
        </a>
      );
    }

    return (
      <a
        href={link}
        className={`text-white py-2 px-4 text-xs rounded-lg mt-[8px] inline-block ${bgColor}`}
      >
        <div className="flex items-center gap-1">
          {icon} {title}
        </div>
      </a>
    );
  }
}
