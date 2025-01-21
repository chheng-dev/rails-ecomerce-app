import React, { Fragment } from "react";
import ProductFormComp from "./ProductFormComp";

export default class CreateProductComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <Fragment>
        <ProductFormComp isEditMode={false} />
      </Fragment>
    );
  }
}
