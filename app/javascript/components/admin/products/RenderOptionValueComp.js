import React, { Fragment } from "react";
import SelectComp from "../sd/SelectComp";
import HeaderFormComp from "../sd/form/HeaderFormComp";

export default class RenderOptionValueComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptionValues: {},
    }
    this.handleOptionValueChange = this.handleOptionValueChange.bind(this);
  }

  handleOptionValueChange(optionTypeId, selectedOptionValues) {
    this.props.onChange(optionTypeId, selectedOptionValues)
    this.setState((prevState) => ({
      selectedOptionValues: {
        ...prevState.selectedOptionValues,
        [optionTypeId]: selectedOptionValues,
      },
    }));
  }

  render() {
    const { selectedOptionValues } = this.state;
    const { selectedOptionTypes } = this.props;
    return (
      <Fragment>
        <HeaderFormComp title="Product Option Values" />
        <div className="p-4 flex items-center gap-x-4">
          {selectedOptionTypes.map((selectedOptionType) => {
            const optionValuesForSelect = selectedOptionType
              ? selectedOptionType.option_values.map((value) => ({
                value: value.id,
                label: value.presentation || value.name,
              }))
              : [];

            return (
              <div key={selectedOptionType.id} className="w-1/4">
                <SelectComp
                  isMulti={true}
                  width="max-w-full z-[9999999]"
                  id={`option-values-${selectedOptionType.id}`}
                  label={`Select Option Values for ${selectedOptionType.label}`}
                  required={true}
                  options={optionValuesForSelect}
                  value={selectedOptionValues[selectedOptionType.id] || []}
                  onChange={(selectedOption) => {
                    this.handleOptionValueChange(selectedOptionType.id, selectedOption);
                  }}
                  placeholder={`Choose for ${selectedOptionType.label}`}
                />
              </div>
            );
          })}
        </div>
      </Fragment>
    )
  }
}