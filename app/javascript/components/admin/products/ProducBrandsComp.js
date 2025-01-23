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
      isShowLabel: props?.isShowLabel,
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
      value: item.id,
      label: item.name
    }));
  }

  handleColorChange = (selectedOption) => {
    const selectedBrandId = selectedOption ? selectedOption.value : null;
    this.props.onChange(selectedBrandId);
  };


  render() {
    const { options, isShowLabel } = this.state;
    const { selectedBrandId } = this.props;
    return (
      <Fragment>
        <SelectComp
          id="brand"
          label="Brands"
          isShowLabel={isShowLabel}
          required={true}
          options={options}
          value={options.find(option => option.value === selectedBrandId) || null}
          onChange={this.handleColorChange}
          placeholder="Choose a Brands"
        />
      </Fragment>
    )
  }
}