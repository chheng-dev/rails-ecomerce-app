import React, { Fragment } from "react";

export default class HeaderFormComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    const { title } = this.props;
    return (
      <Fragment>
        <div className="p-4">
          <h2 className="font-semibold">{title}</h2>
        </div>
        <hr className="mb-3" />
      </Fragment>
    )
  }
}