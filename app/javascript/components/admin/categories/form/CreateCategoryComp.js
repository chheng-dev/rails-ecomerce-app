import React, { Fragment } from "react";
import Select from "react-select";
import CategoryService from "../../../../../services/admin/CategoryService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class CreateCategoryComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "",
      selectedOptionColor: null,
      description: "",
      avatar: null,
      previewImage: null,
      options: [
        { value: "red", label: "Red", colorCode: "#F70104" },
        { value: "darkRed", label: "Dark Red", colorCode: "#ff5733" },
        { value: "blue", label: "Blue", colorCode: "#0088cc" },
        { value: "green", label: "Green", colorCode: "#28a745" },
        { value: "yellow", label: "Yellow", colorCode: "#ffc107" },
        { value: "purple", label: "Purple", colorCode: "#6f42c1" },
        { value: "orange", label: "Orange", colorCode: "#fd7e14" },
        { value: "pink", label: "Pink", colorCode: "#e83e8c" },
        { value: "white", label: "White", colorCode: "#ffffff" },
        { value: "black", label: "Black", colorCode: "#343a40" },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      // Store the file object instead of a URL
      this.setState({
        avatar: file,
        previewImage: URL.createObjectURL(file) // This is just for previewing the image
      });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleColorChange = (selectedOptionColor) => {
    const color = {
      name: selectedOptionColor.label,
      code: selectedOptionColor.colorCode
    };
    this.setState({ color: color, selectedOptionColor });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const { categoryName, description, selectedOptionColor, avatar } = this.state;

    const color = {
      name: selectedOptionColor ? selectedOptionColor.label : '',
      code: selectedOptionColor ? selectedOptionColor.colorCode : ''
    };

    if (!categoryName || !selectedOptionColor) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", description || "");
    formData.append("category_color", JSON.stringify(color));

    // Append the actual file, not a blob URL
    if (avatar && avatar instanceof File) {
      formData.append("avatar", avatar);
    } else {
      toast.error("Please select an image file.");
      return;
    }

    try {
      await CategoryService.createCategory(formData);
      toast.success("Category created successfully!");
      this.setState({
        categoryName: "",
        description: "",
        selectedOptionColor: null,
        avatar: null,
        previewImage: null,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      const errorMessage =
        error.response?.data?.error || "Error creating category. Please try again.";
      toast.error(errorMessage);
    }
  }

  render() {
    const { categoryName, description, selectedOptionColor, options, previewImage } = this.state;

    const customStyles = {
      control: (provided) => ({
        ...provided,
        borderRadius: 8,
        fontSize: "14px",
        width: "100%",
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: 8,
        fontSize: "14px",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#D4D4D8"
          : state.isFocused
            ? "#FF6D2F"
            : "white",
        color: state.isSelected || state.isFocused ? "white" : "black",
        cursor: "pointer",
        padding: "10px",
      }),
    };

    return (
      <Fragment>
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={categoryName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Color<span className="text-red-500">*</span>
            </label>
            <Select
              id="color"
              options={options}
              value={selectedOptionColor}
              onChange={this.handleColorChange}
              placeholder="Select a color"
              styles={customStyles}
              formatOptionLabel={({ label, colorCode }) => (
                <div className="flex items-center gap-x-2">
                  <span>{label}</span>
                  <div
                    className="rounded-full w-4 h-4 border border-gray-400"
                    style={{ backgroundColor: colorCode }}
                  ></div>
                </div>
              )}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Write your description here..."
              value={description}
              onChange={this.handleInputChange}
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              htmlFor="avatar"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Image
            </label>
            <input
              type="file"
              id="avatar"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              onChange={this.handleFileChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 max-w-xs rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save Category
          </button>
        </form>
      </Fragment>
    );
  }
}
