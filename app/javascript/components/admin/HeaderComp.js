import React, { Fragment } from "react";
import SelectComp from "./sd/SelectComp";
import ButtonComp from "./sd/ButtonComp";
import { Trash2Icon } from "lucide-react";
import { toast } from "react-toastify";

export default class HeaderComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: [],
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
    const { link, title, list_title, selectedRows } = this.props;
    return (
      <Fragment>
        <div className="flex justify-between items-center px-4 py-2">
          <div>
            <h2 className="font-semibold text-lg py-3">{list_title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <ButtonComp
              title={title}
              link={link}
              type="submit"
            />
            <div className="relative">
              <SelectComp
                classNames="text-xs"
                options={options}
                value={selectedOption}
                onChange={this.handleChange}
                placeholder="Choose an month"
              />
            </div>
            {
              Array.isArray(selectedRows) && selectedRows.length > 0 &&
              (
                <button
                  className="border border-red-400 p-2 rounded-lg text-red-500 relative top-[4px] transition-all"
                  onClick={() => this.props.handleActionConfirmDelete(selectedRows)}
                >
                  <span className="text-xs flex items-center gap-x-2">
                    <Trash2Icon className="w-4 h-4" /> Delete all
                  </span>
                </button>
              )
            }
          </div>
        </div>
        <hr className="mb-3" />
      </Fragment>
    );
  }
}
