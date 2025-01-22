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

    const { product } = this.props;
    this.state = {
      productName: "",
      description: product?.description || "",
      selectedOptionColor: null,
      selectedGender: null,
      previewImage: product?.avatar || "",
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
      selectedCategoryId: null,
      selectedBrandId: null,
      optionTypeIds: null,
      optionValueIds: null,
      weight: "",
      tagNumber: "",
      stock: "",
      price: 0,
      discount: 0,
      tex: "",
      tag: '',
      images: []
    };

    this.genderOption = [
      {
        value: 'male',
        label: 'Male'
      },
      {
        value: 'female',
        label: 'Female'
      },
      {
        value: 'both',
        label: "Both"
      },
      {
        value: 'other',
        label: 'Other'
      }
    ]

    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  initializeForm() {
    this.setState({
      productName: "",
      description: "",
      selectedCategoryId: null,
      selectedBrandId: null,
      selectedOptionTypes: [],
      weight: "",
      selectedGender: null,
      tagNumber: "",
      stock: 0,
      tag: null,
      price: 0,
      discount: 0,
      tex: "",
      images: [],
      previewImage: null
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleColorChange = (selectedOptionColor) => {
    this.setState({ selectedOptionColor });
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const {
      productName,
      selectedBrandId,
      selectedCategoryId,
      description,
      weight,
      selectedGender,
      tagNumber,
      stock,
      tag,
      price,
      discount,
      tex,
      optionTypeIds,
      optionValueIds,
      images
    } = this.state;

    if (!productName || !selectedCategoryId || !selectedBrandId || !stock) {
      toast.error("Please fill in all required fields.");
      this.setState({ loading: false });
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description || "");
    formData.append("category_id", selectedCategoryId);
    formData.append("brand_id", selectedBrandId);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("gender", selectedGender);
    formData.append("tag", tag);
    formData.append("tex", tex);
    formData.append("tag_number", tagNumber);

    if (optionTypeIds && optionTypeIds.length > 0) {
      optionTypeIds.forEach((optionTypeId) => {
        formData.append("option_type_ids[]", optionTypeId);
      });
    }

    if (optionValueIds && optionValueIds.length > 0) {
      optionValueIds.forEach((optionValueId) => {
        formData.append("option_value_ids[]", optionValueId);
      });
    }

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    const url = this.props.isEditMode
      ? `/api/products/${this.props.product.id}`
      : '/api/products';

    const method = this.props.isEditMode ? 'PUT' : 'POST';

    try {
      await $.ajax({
        url: url,
        method: method,
        data: formData,
        contentType: false,
        processData: false
      });

      toast.success(
        this.props.isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      this.initializeForm();
    } catch (error) {
      console.error('Error processing product:', error);
      toast.error(
        this.props.isEditMode
          ? "Failed to update product. Please try again."
          : "Failed to create product. Please try again."
      );
    } finally {
      this.setState({ loading: false });
    }
  }


  setOptionTypesInfo(selectedOptionTypes) {
    const optionTypeIds = selectedOptionTypes.map((item) => item.id);
    this.setState({ optionTypeIds, selectedOptionTypes });
  }

  handleChangeCategory(selectedCategoryId) {
    this.setState({ selectedCategoryId });
  }

  handleChangeBrand(selectedBrandId) {
    this.setState({ selectedBrandId });
  }

  handleChangeGender(gender) {
    const { value } = gender;
    this.setState({ selectedGender: value });
  }

  handleOptionValueChange(optionTypeId, selectedOptionValues) {
    const optionValueIds = selectedOptionValues.map((item) => item.value);
    this.setState({ optionValueIds });
  }

  handleUploadImages(images) {
    if (images) {
      this.setState({ images });
    }
  }

  render() {
    const {
      productName,
      description,
      selectedOptionColor,
      options,
      selectedGender,
      loading,
      weight,
      tagNumber,
      stock,
      price,
      discount,
      tex,
      images,
    } = this.state;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} size={250} delay={500} />

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
                  <ProductCategoriesComp onChange={(selectedCategoryId) => this.handleChangeCategory(selectedCategoryId)} />
                </div>

                <div className="w-1/3">
                  <OptionTypeComp
                    setOptionTypesInfo={(value) => this.setOptionTypesInfo(value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-1/3">
                  <ProductBrandsComp onChange={(selectedBrandId) => this.handleChangeBrand(selectedBrandId)} />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Weight"
                    name="weight"
                    id="weight"
                    required={false}
                    placeholder="In gm & kg"
                    value={weight}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <SelectComp
                    width="max-w-full z-[999999]"
                    id="gender"
                    label="Gender"
                    required={false}
                    options={this.genderOption}
                    value={selectedGender}
                    onChange={this.handleChangeGender}
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
                    value={tagNumber}
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
                    value={stock}
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
              this.state.selectedOptionTypes && this.state.selectedOptionTypes.length > 0 &&
              <RenderOptionValueComp selectedOptionTypes={this.state.selectedOptionTypes} onChange={(optionTypeId, selectedOptionValues) => this.handleOptionValueChange(optionTypeId, selectedOptionValues)} />
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
                    value={price}
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
                    value={discount}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="w-1/3">
                  <TextFieldComp
                    type="number"
                    label="Tex"
                    name="tex"
                    id="tex"
                    required={false}
                    placeholder="000"
                    prefixIcon={<FileTextIcon className="w-4 h-4 text-gray-500" />}
                    value={tex}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Images  */}
          <div className="product-image bg-white rounded-md my-3">
            <ProductImagesComp onChange={(images) => this.handleUploadImages(images)} />
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
