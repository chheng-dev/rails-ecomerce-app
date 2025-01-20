import React from "react";
import TableComp from "../sd/TableComp";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import ModalComp from "../sd/ModalComp";
import { toast } from "react-toastify";
import LoadingSpinner from "../loading/LoadingSpinner";

export default class BrandListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      loading: false,
      visible: false,
      selectedRow: null,
    };

    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
  }

  componentDidMount() {
    this.getBrandsList();
  }

  async getBrandsList() {
    this.setState({ loading: true });
    $.ajax({
      method: 'GET',
      url: this.props.apibrandsUrl,
      dataType: 'json',
      success: (data) => {
        this.setState({
          brands: data.brands,
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
    location.href = `/admin/brands/${row.slug}/edit`
  }

  handleActionConfirmDelete(row) {
    this.setState({ visible: true, selectedRow: row });
  }

  async handleActionDelete() {
    const { id } = this.state.selectedRow;

    if (!id) {
      toast.error("No category selected for deletion.");
      this.setState({ loading: false });
      return;
    }


    this.setState({ loading: true });

    $.ajax({
      url: `${this.props.apibrandsUrl}/${id}`,
      method: "DELETE",
      success: () => {
        this.setState({ visible: false });
        this.getBrandsList();
        toast.success('Brand has been deleted successfully.');
      },
      error: ({ responseJSON }) => {
        toast.error(responseJSON?.error || "Error deleting category. Please try again.");
      },
      complete: () => this.setState({ loading: false }),
    });
  }


  render() {
    const columns = [
      {
        label: "No",
        key: "id",
        render: (row, index) => (
          <span>{index + 1}</span>
        )
      },
      {
        label: "Brand",
        key: "name",
        render: (row) =>
          row.name ? (
            <div className="">
              <div className="flex items-center">
                <img src={row.image} className="bg-[#EFF2F7] p-0.5 px-2 w-16 h-16 object-contain rounded-md" />
                <span className="ml-2">{row.name}</span>
              </div>
            </div>
          ) : (
            <p></p>
          )
      },
      { label: "Description", key: "description", },
      {
        label: "Action",
        key: "action",
        render: (row) => (
          <div className="flex items-center gap-x-2">
            {/* <button
              className="bg-gray-200 p-2 rounded-full"
              onClick={() => this.handleActionClick(row, "view")}
            >
              <EyeIcon size={16} />
            </button> */}
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

    const { visible, loading } = this.state;
    return (
      <div>
        <LoadingSpinner isVisible={loading} />
        <TableComp
          data={this.state.brands}
          columns={columns}
          isLoading={this.state.loading}
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
