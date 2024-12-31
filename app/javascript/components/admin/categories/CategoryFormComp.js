import React, { Fragment } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import CategoryService from "../../../../services/admin/CategoryService";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../loading/LoadingSpinner";

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    const { category } = this.props;
    this.state = {
      categoryName: category?.name || "",
      description: category?.description || "",
      selectedOptionColor: null,
      previewImage: category?.avatar || "",
      avatar: null,
      loading: false,
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
  }

  componentDidMount() {
    if (this.props.isEditMode) {
      const { color } = this.props;
      const formattedColor = {
        value: color.name,
        label: color.name,
        colorCode: color.code
      }
      this.setState({ selectedOptionColor: formattedColor })
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleColorChange = (selectedOptionColor) => {
    this.setState({ selectedOptionColor });
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        avatar: file,
        previewImage: URL.createObjectURL(file),
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { categoryName, description, selectedOptionColor, avatar } = this.state;

    if (!categoryName || !selectedOptionColor) {
      toast.error("Please fill in all required fields.");
      this.setState({ loading: false });
      return;
    }

    const color = {
      name: selectedOptionColor.label,
      code: selectedOptionColor.colorCode,
    };

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", description || "");
    formData.append("category_color", JSON.stringify(color));

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      if (this.props.isEditMode) {
        const { id } = this.props.category
        await CategoryService.updateCategory(id, formData);
        toast.success("Category updated successfully!");
      } else {
        await CategoryService.createCategory(formData);
        toast.success("Category created successfully!");

        this.setState({
          categoryName: "",
          description: "",
          selectedOptionColor: null,
          avatar: null,
          previewImage: "",
        });
      }
    } catch (error) {
      console.error("Error processing category:", error);
      toast.error(this.props.isEditMode ? "Failed to update category. Please try again." : "Failed to create category. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      categoryName,
      description,
      selectedOptionColor,
      options,
      previewImage,
      loading,
    } = this.state;

    const customStyles = {
      control: (provided) => ({
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
        padding: 10,
      }),
    };

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="mb-5">
            <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900">
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
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="rounded-full w-4 h-4 border"
                    style={{ backgroundColor: colorCode }}
                  ></div>
                </div>
              )}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="block w-full text-sm rounded-lg border p-2.5"
              placeholder="Write your description here..."
              value={description}
              onChange={this.handleInputChange}
            ></textarea>
          </div>

          <div className="mb-5">
            <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900">
              Image
            </label>
            <input
              className="block w-full text-sm rounded-lg border p-2"
              id="avatar"
              type="file"
              onChange={this.handleFileChange}
            />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-3 max-w-xs" />}
          </div>

          <button
            type="submit"
            className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {this.props.isEditMode ? "Update Category" : "Save Category"}
          </button>
        </form>
      </Fragment>
    );
  }
}

export default CategoryForm;
