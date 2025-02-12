import React, { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../loading/LoadingSpinner";
import TextFieldComp from "../sd/form/TextFieldComp";
import TextAreaComp from "../sd/form/TextAreaComp";


class BrandFormComp extends React.Component {
  constructor(props) {
    super(props);

    const { brand } = this.props;
    this.state = {
      brandName: brand?.name || "",
      description: brand?.description || "",
      selectedOptionColor: null,
      previewImage: brand?.image || "",
      image: null,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        image: file,
        previewImage: URL.createObjectURL(file),
      });
    }
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const { brandName, description, image } = this.state;

    if (!brandName) {
      toast.error("Please fill in all required fields.");
      this.setState({ loading: false });
      return;
    }

    const formData = new FormData();
    formData.append("brand[name]", brandName);
    formData.append("brand[description]", description || "");

    if (image) {
      formData.append("image", image);
    }

    const url = this.props.isEditMode
      ? `/api/brands/${this.props.brand.id}`
      : '/api/brands';

    const method = this.props.isEditMode ? 'PUT' : 'POST'

    $.ajax({
      url: url,
      method: method,
      data: formData,
      contentType: false,
      processData: false,
      success: (response) => {
        const { slug } = response.brand;
        toast.success(
          this.props.isEditMode
            ? "Brand updated successfully!"
            : "Brand created successfully!"
        );

        if (!this.state.isEditMode) {
          this.setState({
            brandName: '',
            description: '',
            image: null,
            previewImage: null
          })
        }

        window.location.href = `/admin/brands/${slug}/edit`
      },
      error: (xhr, status, error) => {
        console.error('Error processing brand:', brand);
        toast.error(
          this.props.isEditMode
            ? "Failed to update brand. Please try again."
            : "Failed to create brand. Please try again."
        );
      },
      complete: () => {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const {
      brandName,
      description,
      previewImage,
      loading,
    } = this.state;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="mb-5">
            <TextFieldComp
              type="text"
              label="Brand Name"
              name="brandName"
              id="brandName"
              required={true}
              placeholder="Enter your brand name"
              value={brandName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-5">
            <TextAreaComp
              label="Description"
              id="description"
              name="description"
              rows={4}
              placeholder="Write your description here..."
              value={description}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
              Image
            </label>
            <input
              className="block w-full text-sm rounded-lg border p-2 placeholder:text-gray-400 focus:ring-primary focus:border-primary"
              id="image"
              type="file"
              onChange={this.handleFileChange}
            />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-3 max-w-xs" />}
          </div>

          <div className="flex items-center gap-x-2">
            <button type="submit" className="text-gray-500 rounded-lg border border-gray-400 text-sm px-5 py-2 hover:bg-gray-500 hover:text-white">
              Cancel
            </button>

            <button
              type="submit"
              className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2"
            >
              {this.props.isEditMode ? "Update Brand" : "Save Brand"}
            </button>
          </div>
        </form>
      </Fragment >
    );
  }
}

export default BrandFormComp;
