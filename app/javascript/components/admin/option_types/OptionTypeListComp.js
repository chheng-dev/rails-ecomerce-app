import React from "react";
import TableComp from "../sd/TableComp";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import ModalComp from "../sd/ModalComp";
import { toast } from "react-toastify";
import LoadingSpinner from "../loading/LoadingSpinner";

export default class OptionTypeListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option_types: [],
      loading: false,
      visible: false,
      selectedRow: null,
    };

    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
  }

  componentDidMount() {
    this.getOptionTypesList();
  }

  async getOptionTypesList() {
    this.setState({ loading: true });
    $.ajax({
      method: 'GET',
      url: this.props.apiOptionTypesUrl,
      dataType: 'json',
      success: (data) => {
        this.setState({
          option_types: data.option_types,
          loading: false
        })
      },
      error: (xhr, status, error) => {
        this.setState({ loading: false });
      }
    })
  };

  handleActionClick = (row, actionType) => {
    console.log(`Action: ${actionType} clicked for row:`, row);
  };

  handleActionEditClick(row) {
    location.href = `/admin/option_types/${row.id}/option_values/new`

  }

  handleActionConfirmDelete(row) {
    this.setState({ visible: true, selectedRow: row });
  }

  async handleActionDelete() {
    const { id } = this.state.selectedRow;

    if (!id) {
      toast.error("No option type selected for deletion.");
      this.setState({ loading: false });
      return;
    }


    this.setState({ loading: true });

    $.ajax({
      url: `${this.props.apiOptionTypesUrl}/${id}`,
      method: "DELETE",
      success: () => {
        this.setState({ visible: false });
        this.getOptionTypesList();
        toast.success('Option type has been deleted successfully.');
      },
      error: ({ responseJSON }) => {
        toast.error(responseJSON?.error || "Error deleting option type. Please try again.");
      },
      complete: () => this.setState({ loading: false }),
    });
  }


  render() {
    const columns = [
      {
        label: "ID",
        key: "id",
      },
      {
        label: "Name",
        key: "name"
      },
      { label: "Presentation", key: "presentation" },
      {
        label: "Filterable",
        key: "filterable",
        render: (row) => (
          <div>
            {row.filterable ?
              <span className="bg-green-600 px-1 py-0.5 rounded-md text-xs text-white">Yes</span> :
              <span className="bg-yellow-500 px-1 py-0.5 rounded-md text-xs text-white">No</span>
            }
          </div>
        )
      },
      {
        label: "Action",
        key: "action",
        render: (row) => (
          <div className="flex items-center gap-x-2">
            <button
              className="bg-secondary p-2 rounded-full"
              onClick={() => this.handleActionEditClick(row)}
            >
              <Edit3Icon className="text-primary" size={16} />
            </button>
            <button
              className="bg-[#FFEFEF] p-2 rounded-full text-white"
              onClick={() => this.handleActionConfirmDelete(row)}
            >
              <Trash2Icon className="text-red-500" size={16} />
            </button>
          </div>
        ),
      },
    ];

    const { visible, loading, option_types } = this.state;
    return (
      <div>
        <LoadingSpinner isVisible={loading} />
        <TableComp
          data={option_types}
          columns={columns}
          isLoading={loading}
          onActionClick={this.handleActionClick}
          rowsPerPageOptions={[5, 10, 15]}
        />
        <ModalComp
          title="Are you sure you want to delete this brand?"
          visible={visible}
          onClose={() => this.setState({ visible: false })}
          handleSubmit={() => this.handleActionDelete()}
        />
      </div>
    );
  }
}
