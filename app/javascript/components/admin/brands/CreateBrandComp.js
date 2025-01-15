import React, { Fragment } from "react";
import BrandFormComp from "./BrandFormComp";

export default class CreateBrandComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Fragment>
        <BrandFormComp isEditMode={false} />
      </Fragment>
    );
  }
}
