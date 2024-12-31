import React, { Fragment } from "react";
import CategoryForm from "./CategoryFormComp";
import LoadingSpinner from "../loading/LoadingSpinner";

export default class EditCategoryComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      category: props.category
    }
  }

  render() {
    const { category, loading } = this.state;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />
        <CategoryForm
          isEditMode={true}
          category={category}
          color={this.props.color}
        />
      </Fragment>
    )
  }
}
