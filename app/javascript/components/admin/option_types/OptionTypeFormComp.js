import React, { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../loading/LoadingSpinner";
import TextFieldComp from "../sd/form/TextFieldComp";
import { Trash2Icon } from "lucide-react";


class OptionTypeFormComp extends React.Component {
  constructor(props) {
    super(props);

    const { option_type, option_values, brand } = this.props;

    this.state = {
      name: brand?.name || "",
      presentation: brand?.name || "",
      filterable: false,
      loading: false,
      optionType: {
        id: '' || option_type?.id,
        name: '' || option_type?.name,
        presentation: '' || option_type?.presentation,
        filterable: false || option_type?.filterable,
        optionValues: option_values?.length > 0
          ? option_values.map(value => ({
            id: value?.id || "",
            name: value?.name || "",
            presentation: value?.presentation || ""
          }))
          : [{ id: "", name: "", presentation: "" }]
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.addOptionValue = this.addOptionValue.bind(this);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      optionType: {
        ...prevState.optionType,
        [name]: value
      }
    }));
  };

  handleCheckboxChange(e) {
    const { name, checked } = e.target;
    this.setState(prevState => ({
      optionType: {
        ...prevState.optionType,
        [name]: checked
      }
    }));
  }


  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const { name, presentation, filterable, optionValues } = this.state.optionType;

    if (!name || !presentation) {
      toast.error("Please fill in all required fields.");
      this.setState({ loading: false });
      return;
    }

    const url = this.props.isEditMode
      ? `/api/option_types/${this.props.option_type.id}`
      : this.props.apiCreateOptionTypesUrl;

    const method = this.props.isEditMode ? 'PUT' : 'POST';

    const optionValuesArray = optionValues.map(value => ({
      name: value.name,
      presentation: value.presentation,
      id: value.id || undefined,
      _destroy: value._destroy || false
    }));

    $.ajax({
      url: url,
      method: method,
      data: JSON.stringify({
        option_type: {
          name,
          presentation,
          filterable,
          option_values_attributes: optionValuesArray
        }
      }),
      contentType: "application/json",
      success: (response) => {
        toast.success(
          this.props.isEditMode
            ? "Option type updated successfully!"
            : "Option type created successfully!"
        );

        if (!this.props.isEditMode) {
          this.setState({
            name: '',
            presentation: '',
            filterable: false,
            optionValues: [{ name: '', presentation: '' }]
          });
        }

        if (!this.props.isEditMode) {
          window.location.href = `/admin/option_types/${response.option_type.id}/option_values/new`;
        }
      },
      error: (xhr, status, error) => {
        console.error('Error processing option type:', error);
        toast.error(
          this.props.isEditMode
            ? "Failed to update option type. Please try again."
            : "Failed to create option type. Please try again."
        );
      },
      complete: () => {
        this.setState({ loading: false });
      }
    });
  }

  addOptionValue() {
    this.setState((prevState) => {
      const newOptionValue = { name: '', presentation: '', id: undefined };
      const optionValues = prevState.optionType.optionValues;

      const isDuplicate = optionValues.some(
        (value) => value.name === newOptionValue.name && value.presentation === newOptionValue.presentation
      );

      if (isDuplicate) {
        toast.error("This option value already exists.");
        return null;
      }

      return {
        optionType: {
          ...prevState.optionType,
          optionValues: [...optionValues, newOptionValue],
        },
      };
    });
  }

  removeOptionValue(index) {
    this.setState((prevState) => {
      const updatedOptionValues = prevState.optionType.optionValues.map((value, i) => {
        if (i === index) {
          return { ...value, _destroy: true };
        }
        return value;
      });

      if (updatedOptionValues.filter(value => !value._destroy).length === 0) {
        toast.error("At least one option value is required.");
        return null;
      }

      return {
        optionType: {
          ...prevState.optionType,
          optionValues: updatedOptionValues,
        },
      };
    }, () => {
      console.log('Updated Option Values:', this.state.optionType.optionValues);
    });
  }


  handleOptionValueChange(index, e) {
    const { name, value } = e.target;

    this.setState((prevState) => {
      const updatedOptionValues = [...prevState.optionType.optionValues];

      updatedOptionValues[index] = {
        ...updatedOptionValues[index],
        [name]: value,
      };

      return {
        optionType: {
          ...prevState.optionType,
          optionValues: updatedOptionValues,
        },
      };
    });
  }

  createOptionValue() {
    const { optionValues } = this.state.optionType;
    return (
      <div className="my-3">
        <h3>Option Values</h3>
        {
          optionValues.filter(value => !value._destroy).map((optionValue, index) => (
            <div className="flex items-center justify-between gap-3" key={index}>
              <div className="w-full">
                <div className="flex items-center justify-between gap-3 my-3">
                  <div className="w-1/2">
                    <TextFieldComp
                      type="text"
                      label="Name"
                      name="name"
                      id={`name-${index}`}
                      required={true}
                      placeholder="Enter name"
                      value={optionValue.name}
                      onChange={(e) => this.handleOptionValueChange(index, e)}
                    />
                  </div>
                  <div className="w-1/2">
                    <TextFieldComp
                      type="text"
                      label="Presentation"
                      name="presentation"
                      id={`presentation-${index}`}
                      required={true}
                      placeholder="Enter presentation"
                      value={optionValue.presentation}
                      onChange={(e) => this.handleOptionValueChange(index, e)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-24">
                <button
                  className="bg-[#FFEFEF] p-2 rounded-full text-white relative top-[9px]"
                  onClick={() => this.removeOptionValue(index)}
                  type="button"
                >
                  <Trash2Icon className="text-red-500" size={16} />
                </button>
              </div>
            </div>
          ))
        }

        <div className="text-center">
          <button
            type="button"
            className="text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2"
            onClick={this.addOptionValue}
          >
            Add Option Value
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {
      loading,
      optionType
    } = this.state;

    const { name, presentation, filterable } = optionType;

    return (
      <Fragment>
        <LoadingSpinner isVisible={loading} />
        <form className="mx-auto" onSubmit={this.handleSubmit}>
          <div className="mb-5">
            <TextFieldComp
              type="text"
              label="Name"
              name="name"
              id="name"
              required={true}
              placeholder="Enter name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-5">
            <TextFieldComp
              type="text"
              label="Presentation"
              name="presentation"
              id="presentation"
              required={true}
              placeholder="Enter presentation"
              value={presentation}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 checked:text-primary focus:ring-0 rounded-md"
              id="filterable"
              name="filterable"
              checked={filterable}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor="filterable" className="ml-3 block text-sm cursor-pointer">
              Filterable
            </label>
          </div>

          {this.props.hasCreateOptionValue && this.createOptionValue()}

          <div className="flex items-center gap-x-2">
            <button type="submit" className="text-gray-500 rounded-lg border border-gray-400 text-sm px-5 py-2 hover:bg-gray-500 hover:text-white">
              Cancel
            </button>

            <button
              type="submit"
              className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2"
            >
              {this.props.isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Fragment >
    );
  }
}

export default OptionTypeFormComp;
