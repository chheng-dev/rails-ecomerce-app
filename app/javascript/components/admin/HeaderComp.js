import React, { Fragment } from "react";
import { Button } from "antd";
import SelectComp from "./sd/SelectComp";

export default class HeaderComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      options: [
        { value: 'this_month', label: 'This Month' },
        { value: 'last_month', label: 'Last Month' },
        { value: 'this_year', label: 'This Year' },
      ],
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
    const { link, title, list_title } = this.props;
    return (
      <Fragment>
        <div className="flex justify-between items-center px-4">
          <div>
            <h2 className="font-semibold text-lg py-3">{list_title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              size="medium"
              className="text-xs"
              href={link}
            >
              {title}
            </Button>
            <div className="relative">
              <SelectComp
                options={options}
                value={selectedOption}
                onChange={this.handleChange}
                placeholder="Choose an month"
              />
            </div>
          </div>
        </div>
        <hr className="mb-3" />
      </Fragment>
    );
  }
}
