import React, { Fragment } from "react";
import OptionTypeFormComp from "./OptionTypeFormComp";

export default class EditOptionTypeComp extends React.Component {
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
          hasCreateOptionValue={true}
          isEditMode={true}
          option_type={this.props.option_type}
          option_values={this.props.option_values}
          apiCreateOptionTypesUrl={this.props.api_option_types_path}
        />
      </Fragment>
    );
  }
}
