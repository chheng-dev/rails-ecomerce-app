import React, { Fragment } from "react";
import SelectComp from "../sd/SelectComp";
import { generateSlug } from "../../../../utils/generateSlug";

export default class OptionTypeComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedOptionTypes: [],
      selectedOptionValues: {},
      options: [],
    };

    this.handleOptionTypeChange = this.handleOptionTypeChange.bind(this);
  }

  componentDidMount() {
    this.getAllOptionTypes();
  }

  async getAllOptionTypes() {
    this.setState({ loading: true });

    $.ajax({
      method: "GET",
      url: "/api/option_types",
      dataType: "json",
      success: (data) => {
        const options = this.renderOptions(data.option_types);

        this.setState({
          options,
          loading: false,
        });
      },
      error: (xhr, status, error) => {
        console.error("Error fetching option types:", error);
        this.setState({ loading: false });
      },
    });
  }

  renderOptions(data) {
    return data.map((item) => ({
      id: item.id,
      value: generateSlug(item.name),
      label: item.name,
      option_values: item.option_values || [], // Option values for this option type
    }));
  }

  handleOptionTypeChange(selectedOptionTypes) {
    this.setOptionTypesInfo(selectedOptionTypes);
    this.setState({
      selectedOptionTypes,
    });
  }

  setOptionTypesInfo(selectedOptionTypes) {
    this.props.setOptionTypesInfo(selectedOptionTypes);
  }

  render() {
    const { options, selectedOptionTypes, selectedOptionValues, loading } = this.state;

    return (
      <Fragment>
        <SelectComp
          isMulti={true}
          width="max-w-full z-[9999999]"
          id="option-types"
          label="Select Product Option Types"
          required={false}
          options={options.map((optionType) => ({
            value: optionType.id,
            label: optionType.label,
          }))}
          value={selectedOptionTypes.map((type) => ({
            value: type.id,
            label: type.label,
          }))}
          onChange={(selectedOptions) => {
            const selected = selectedOptions.map((option) =>
              options.find((opt) => opt.id === option.value)
            );
            this.handleOptionTypeChange(selected);
          }}
          placeholder="Choose option types"
        />
      </Fragment>
    );
  }
}
