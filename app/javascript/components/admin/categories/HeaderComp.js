import React, { Fragment } from "react";
import { BackTop, Button, Space } from "antd";
import { ChevronDown } from "lucide-react";
import Select from "react-select";
import { options } from "less";
import SelectComp from "../sd/SelectComp";

export default class HeaderComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      options: [
        { value: 'this_month', label: 'This Month' },
        { value: 'last_month', label: 'Last Month' },
        { value: 'this_year', label: 'This Year' },
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ selectedOption: this.state.options[0] });
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }

  render() {
    const { options, selectedOption } = this.state;

    return (
      <Fragment>
        <div className="flex justify-between items-center px-4">
          <div>
            <h2 className="font-semibold text-lg py-3">All Categories List</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              size="medium"
              className="text-xs"
              href="/admin/categories/new"
            >
              Add Category
            </Button>
            <div className="relative">
              <SelectComp
                options={options}
                value={selectedOption}
                onChange={this.handleChange}
                placeholder="Choose an animal"
              />
            </div>
          </div>
        </div>
        <hr className="mb-3" />
      </Fragment>
    );
  }
}
