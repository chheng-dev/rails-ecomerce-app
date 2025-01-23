import React, { Fragment } from "react";
import TextFieldComp from "../sd/form/TextFieldComp";
import SelectComp from "../sd/SelectComp";
import { SearchCheckIcon } from "lucide-react";
import Datepicker from "react-tailwindcss-datepicker";
import ProductBrandsComp from "./ProducBrandsComp";
import ProductCategoriesComp from "./ProductCategoriesComp";
import dayjs from "dayjs";

export default class ProductFilterComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateValue: { startDate: null, endDate: null },
      selectedBrandId: null,
      selectedOptionCategory: null,
      loading: false,
      productName: "",
      products: [],
      selectedCategoryId: null,
    }

    this.handleQuery = this.handleQuery.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange = (newValue) => {
    const { startDate, endDate } = newValue;
    const formatStartDate = dayjs(startDate).format('YYYY/MM/DD');
    const formatEndDate = dayjs(endDate).format('YYYY/MM/DD');

    this.setState({
      dateValue: {
        startDate: formatStartDate,
        endDate: formatEndDate
      }
    });
  };

  handleChangeBrand(selectedBrandId) {
    this.setState({ selectedBrandId });
  }

  handleChangeCategory(selectedCategoryId) {
    this.setState({ selectedCategoryId });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleQuery(e) {
    e.preventDefault();

    const { productName, selectedBrandId, selectedOptionCategory, dateValue } = this.state;
    const { startDate, endDate } = dateValue;

    const query = {
      productName: productName,
      selectedBrandId: selectedBrandId,
      selectedOptionCategory: selectedOptionCategory,
      startDate: startDate,
      endDate: endDate

    }
    this.props.setProductQuery(query);
  }

  handleReset(e) {
    e.preventDefault();
    let query = {}

    this.setState({
      productName: '',
      selectedBrandId: null,
      selectedCategoryId: null,
      dateValue: {
        startDate: null,
        endDate: null
      },
    });
    this.props.setProductQuery(query);
  }

  render() {
    const { dateValue, productName, selectedCategoryId, selectedBrandId } = this.state;
    return (
      <Fragment>
        <div className="bg-white rounded-md mb-4 p-4">
          <div className="flex items-center gap-2">
            <div className="w-1/3">
              <TextFieldComp
                type="text"
                name="productName"
                id="productName"
                value={productName}
                required={false}
                onChange={this.handleInputChange}
                prefixIcon={<SearchCheckIcon className="w-4 h-4" />}
                placeholder="Search by product name..."
              />
            </div>

            <div className="w-1/3">
              <ProductBrandsComp
                isShowLabel={false}
                selectedBrandId={selectedBrandId}
                onChange={(selectedBrandId) => this.handleChangeBrand(selectedBrandId)}
              />
            </div>

            <div className="w-1/3">
              <ProductCategoriesComp
                selectedCategoryId={selectedCategoryId}
                isShowLabel={false}
                onChange={(selectedCategoryId) => this.handleChangeCategory(selectedCategoryId)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2/5">
              <div className="flex items-center gap-2">
                <div className="w-full">
                  <label htmlFor="date" className="text-sm">Start Date</label>
                  <Datepicker
                    primaryColor="orange"
                    id="date"
                    name="date"
                    inputClassName="w-full bg-[#F3F5F7] rounded-md focus:ring-0 focus:ring-gray-200 placeholder:text-gray-300 text-sm mt-1 border border-gray-200 datePicker py-2.5"
                    value={dateValue}
                    onChange={this.handleChange}
                    showShortcuts={false}
                    showFooter={false}
                    useRange={false}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/5">
              <div className="flex items-center gap-2 relative top-[8px]">
                <div className="w-1/2">
                  <button
                    type="submit"
                    onClick={this.handleQuery}
                    className="bg-orange-700 p-2 rounded-lg text-white w-full relative top-[4px] transition-all hover:bg-primary hover:text-white"
                  >
                    <span className="text-xs font-meduim">
                      Filter
                    </span>
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    type="submit"
                    onClick={this.handleReset}
                    className="border border-gray-200 p-2 rounded-lg text-gray-500 w-full relative top-[4px] transition-all hover:bg-gray-200 hover:text-gray-700"
                  >
                    <span className="text-xs font-meduim">
                      Reset
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Fragment>
    )
  }
}