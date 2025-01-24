import React, { Fragment } from "react";
import SelectComp from "../sd/SelectComp";
import slugify from "react-slugify";

export default class ProductCategoriesComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedOptionCategory: [],
      options: [],
    }
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  async getAllCategories() {
    this.setState({ loading: true });
    $.ajax({
      method: 'GET',
      url: '/api/categories',
      dataType: 'json',
      success: (data) => {
        const result = this.renderCategoriesOptions(data);
        this.setState({
          options: result,
          loading: false
        })
      },
      error: (xhr, status, error) => {
        this.setState({ loading: false });
      }
    })
  };

  renderCategoriesOptions(options) {
    return options.map((item) => ({
      value: item.id,
      label: item.name
    }));
  }

  handleCategoriesChange(selectedOptionCategory) {
    const selectedCategoryId = selectedOptionCategory ? selectedOptionCategory.value : null;
    this.props.onChange(selectedCategoryId);
  };


  render() {
    const { options } = this.state;
    const { width, isShowLabel, selectedCategoryId } = this.props;

    return (
      <Fragment>
        <SelectComp
          // classNames={`z-[999999]`}
          id="gender"
          label="Product Categories"
          isShowLabel={isShowLabel}
          required={true}
          value={options.find(option => option.value === selectedCategoryId) || null}
          options={options}
          onChange={this.handleCategoriesChange}
          placeholder="Choose a categories"
        />
      </Fragment>
    )
  }
}