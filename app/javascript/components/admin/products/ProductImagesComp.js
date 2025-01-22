import React, { Fragment } from "react";
import HeaderFormComp from "../sd/form/HeaderFormComp";
import { X } from "lucide-react";

export default class ProductImagesComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      previewImages: ""
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const files = Array.from(event.target.files);
    const previewImages = files.map((file) => URL.createObjectURL(file));

    this.setState((prevState) => {
      const newSelectedFiles = [...prevState.selectedFiles, ...files];
      const newPreviewImages = [...prevState.previewImages, ...previewImages];

      this.props.onChange(newSelectedFiles);

      return {
        selectedFiles: newSelectedFiles,
        previewImages: newPreviewImages
      }
    });
  }

  handleRemoveImage(index) {
    const { previewImages, selectedFiles } = this.state;
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    const updatedSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    this.setState({ previewImages: updatedPreviewImages, selectedFiles: updatedSelectedFiles });
    console.log(this.state.selectedFiles);
    this.props.onChange(updatedSelectedFiles)
  }

  render() {
    const { previewImages } = this.state;
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
            onChange={this.onChange}
            multiple
          />
          <div className="flex items-center gap-3">
            {
              previewImages.length > 0 &&
              previewImages.map((src, index) => (
                <div key={index} className="w-24 border border-primary rounded-lg my-3">
                  <div className="flex justify-end items-center gap-4">
                    <X className="w-5 h-5 text-primary bg-secondary rounded-full cursor-pointer" onClick={() => this.handleRemoveImage(index)} />
                  </div>
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="mt-3" />

                </div>
              ))
            }
          </div>
        </div>
      </Fragment>
    )
  }
}