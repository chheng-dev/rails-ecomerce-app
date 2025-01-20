import React, { Fragment } from "react";
import { toast } from "react-toastify";
import CategoryService from "../../../../services/admin/CategoryService";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../loading/LoadingSpinner";
import TextFieldComp from "../sd/form/TextFieldComp";
import SelectComp from "../sd/SelectComp";
import { DollarSign, FileTextIcon, TicketPercent } from "lucide-react";
import ProductCategoriesComp from "./ProductCategoriesComp";
import ProductBrandsComp from "./ProducBrandsComp";
import OptionTypeComp from "./OptionTypeComp";
import RenderOptionValueComp from "./RenderOptionValueComp";
import ProductImagesComp from "./ProductImagesComp";
import HeaderFormComp from "../sd/form/HeaderFormComp";


class ProductFormComp extends React.Component {
  constructor(props) {
    super(props);

    const { category } = this.props;
    this.state = {
      categoryName: category?.name || "",
      productName: "",
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
      selectedOptionTypes: [],
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

  setOptionTypesInfo(selectedOptionTypes) {
    this.setState({ selectedOptionTypes });
  }

  render() {
    const {
      categoryName,
      productName,
      description,
      selectedOptionColor,
      options,
      previewImage,
      loading,
    } = this.state;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />

        <form className="mx-auto mb-6" onSubmit={this.handleSubmit}>
          {/* Product Information */}
          <div className="product-info bg-white rounded-md">
            <HeaderFormComp title="Product Information" />
            <div className="pb-4 px-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-1/3">
                  <TextFieldComp
                    type="text"
                    label="Product Name"
                    name="productName"
                    id="productName"
                    required={true}
                    placeholder="Items Name"
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="w-1/3">
                  <ProductCategoriesComp />
                </div>

                <div className="w-1/3">
                  <OptionTypeComp
                    setOptionTypesInfo={(value) => this.setOptionTypesInfo(value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-1/3">
                  <ProductBrandsComp />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="text"
                    label="Weight"
                    name="weight"
                    id="weight"
                    required={false}
                    placeholder="In gm & kg"
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <SelectComp
                    width="max-w-full z-[999999]"
                    id="gender"
                    label="Gender"
                    required={false}
                    options={options}
                    value={selectedOptionColor}
                    onChange={this.handleColorChange}
                    placeholder="Select Gender"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="block w-full text-sm rounded-lg border p-2.5 bg-gray-50  border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-primary focus:border-primary"
                  placeholder="Short description about the product"
                  value={description}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-1/3">
                  <TextFieldComp
                    type="text"
                    label="Tag Number"
                    name="tagNumber"
                    id="tagNumber"
                    required={false}
                    placeholder="#*******"
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Stock"
                    name="stock"
                    id="stock"
                    required={true}
                    placeholder="Quantity"
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <SelectComp
                    width="max-w-full z-[999999]"
                    id="tag"
                    label="Tag"
                    required={false}
                    options={options}
                    value={selectedOptionColor}
                    onChange={this.handleColorChange}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rendere Option Values  */}
          <div className="my-4 bg-white rounded-md">
            {
              this.state.selectedOptionTypes.length > 0 && <RenderOptionValueComp selectedOptionTypes={this.state.selectedOptionTypes} />
            }
          </div>

          {/* Product Pricing  */}
          <div className="product-pricing bg-white rounded-md my-3">
            <Fragment>
              <div className="px-4 py-4">
                <h2 className="font-semibold">Pricing Details</h2>
              </div>
              <hr className="mb-3" />
            </Fragment>
            <div className="pb-4 px-4">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Price"
                    name="price"
                    id="price"
                    required={false}
                    placeholder="000"
                    prefixIcon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Discount"
                    name="discount"
                    id="discount"
                    required={false}
                    placeholder="000"
                    prefixIcon={<TicketPercent className="w-4 h-4 text-gray-500" />}
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Tex"
                    name="text"
                    id="text"
                    required={false}
                    placeholder="000"
                    prefixIcon={<FileTextIcon className="w-4 h-4 text-gray-500" />}
                    value={productName}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Images  */}
          <div className="product-image bg-white rounded-md my-3">
            <ProductImagesComp />
          </div>

          <div className="bg-[#EFF2F6] rounded-md py-6 flex justify-end items-center pr-4">
            <button
              type="submit"
              className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2"
            >
              {this.props.isEditMode ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </Fragment >
    );
  }
}

export default ProductFormComp;
