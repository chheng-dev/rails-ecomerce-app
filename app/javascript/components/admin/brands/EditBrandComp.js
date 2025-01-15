import React, { Fragment } from "react";
import LoadingSpinner from "../loading/LoadingSpinner";
import BrandFormComp from "./BrandFormComp";

export default class EditBrandComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      brand: props.brand
    }
  }

  render() {
    const { brand, loading } = this.state;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />
        <BrandFormComp
          isEditMode={true}
          brand={brand}
        />
      </Fragment>
    )
  }
}
