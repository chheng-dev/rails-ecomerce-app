import React, { Fragment } from "react";
import Select from "react-select";
import SelectComp from "../sd/SelectComp";
import { options } from "less";

export default class ProductBrandsComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedOption: null,
      options: [],
    }
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentDidMount() {
    this.getAllBrands();
  }

  async getAllBrands() {
    this.setState({ loading: true });
    $.ajax({
      method: 'GET',
      url: '/api/brands',
      dataType: 'json',
      success: (data) => {
        const result = this.renderBrandsOptions(data.brands);
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

  renderBrandsOptions(options) {
    return options.map((item) => ({
      id: item.id,
      value: item.name.replace(" ", "-").toLowerCase(),
      label: item.name
    }));
  }

  handleColorChange = (selectedOption) => {
    const { id } = selectedOption;
    this.props.onChange(id);
    this.setState({ selectedOption });
  };


  render() {
    const { options, selectedOption } = this.state;
    return (
      <Fragment>
        <SelectComp
          width="max-w-full"
          id="brand"
          label="Brands"
          required={true}
          options={options}
          value={selectedOption}
          onChange={this.handleColorChange}
          placeholder="Choose a Brands"
        />
      </Fragment>
    )
  }
}