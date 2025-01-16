import React, { Fragment } from "react";
import OptionTypeFormComp from "./OptionTypeFormComp";

export default class CreateOptionTypeComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Fragment>
        <OptionTypeFormComp
          hasCreateOptionValue={false}
          isEditMode={false}
          apiCreateOptionTypesUrl={this.props.api_option_types_path}
        />
      </Fragment>
    );
  }
}
