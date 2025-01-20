import React, { Fragment } from "react";
import Select from "react-select";
import SelectComp from "../sd/SelectComp";
import { options } from "less";

export default class ProductCategoriesComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedOptionColor: null,
      options: [],
    }
    this.handleColorChange = this.handleColorChange.bind(this);
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
      id: item.id,
      value: item.name.replace(" ", "-").toLowerCase(),
      label: item.name
    }));
  }

  handleColorChange = (selectedOptionColor) => {
    this.setState({ selectedOptionColor });
  };


  render() {
    const { options, selectedOptionColor } = this.state;
    return (
      <Fragment>
        <SelectComp
          width="max-w-full z-[999999]"
          id="gender"
          label="Product Categories"
          required={true}
          options={options}
          value={selectedOptionColor}
          onChange={this.handleColorChange}
          placeholder="Choose a categories"
        />
      </Fragment>
    )
  }
}