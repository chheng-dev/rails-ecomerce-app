import React, { Fragment } from "react";
import CategoryForm from "./CategoryFormComp";

export default class CreateCategoryComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "",
      loading: false,
      selectedOptionColor: null,
      description: "",
      avatar: null,
      previewImage: null,
    };
  }

  render() {
    return (
      <Fragment>
        <CategoryForm isEditMode={false} />
      </Fragment>
    );
  }
}
