import React, { Fragment } from "react";
import HeaderFormComp from "../sd/form/HeaderFormComp";

export default class ProductImagesComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: ""
    }
  }

  render() {
    const { previewImage } = this.state;
    return (
      <Fragment>
        <HeaderFormComp title="Product Images" />
        <div className="mb-5 p-4">
          <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            className="block w-full text-sm rounded-lg border p-2 placeholder:text-gray-400 focus:ring-primary focus:border-primary"
            id="avatar"
            type="file"
            onChange={this.handleFileChange}
          />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-3 max-w-xs" />}
        </div>
      </Fragment>
    )
  }
}