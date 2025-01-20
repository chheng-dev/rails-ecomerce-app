import React from "react";
import TableComp from "../sd/TableComp";
import CategoryService from "../../../../services/admin/CategoryService";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import ModalComp from "../sd/ModalComp";
import { toast } from "react-toastify";
import LoadingSpinner from "../loading/LoadingSpinner";
import { currencyUsd } from "../../../../utils/formatPrice";
export default class ProductListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
      visible: false,
      selectedRow: null,
    };

    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
  }

  componentDidMount() {
    this.getProductsList();
  }

  async getProductsList() {
    this.setState({ loading: true });
    $.ajax({
      method: 'GET',
      url: this.props.apiProductUrl,
      dataType: 'json',
      success: (data) => {
        this.setState({
          products: data.attributes,
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
    location.href = `/admin/categories/${row.id}/edit`
  }

  handleActionConfirmDelete(row) {
    this.setState({ visible: true, selectedRow: row });
  }

  async handleActionDelete() {
    this.setState({ loading: true });
    const { id } = this.state.selectedRow;

    if (!id) {
      toast.error("No category selected for deletion.");
      this.setState({ loading: false });
      return;
    }

    try {
      await CategoryService.deleteCategoryById(id);

      this.setState({ visible: false });

      this.getCategories();

      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);

      const errorMessage =
        error.response?.data?.error || "Error deleting category. Please try again.";
      toast.error(errorMessage);
      this.setState({ visible: false });
    } finally {
      this.setState({ loading: false });
    }
  }

  activeProductImage(images) {
    if (images.length > 0) {
      const activeImage = images.find(image => image.is_active);
      return activeImage.url;
    }
    return
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
        label: "Product Name & Size",
        key: "name",
        render: (row) =>
          row.name ? (
            <div className="">
              <div className="flex items-center">
                <img src={this.activeProductImage(row.images)} className="bg-[#EFF2F7] p-0.5 px-2 w-16 h-16 object-contain rounded-md" />
                <div className="flex flex-col ml-2 gap-y-2">
                  <span>{row.name}</span>
                  <span className="text-xs text-gray-400">
                    Size: S,M,L
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          )
      },
      {
        label: "Price",
        key: "price",
        render: (row) =>
          row.price ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-300">{currencyUsd(row.price)}</span>
            </div>
          ) : (
            0
          ),
      },
      {
        label: "Stock",
        key: "stock",
        render: (row) =>
          row.price ? (
            <div className="flex flex-col items-start gap-2">
              <p>{row.stock} Item Left</p>
              <span className="text-xs">155 Sold</span>
            </div>
          ) : (
            0
          ),
      },
      {
        label: 'Category',
        key: 'category'
      },
      {
        label: 'Brand',
        key: 'brand'
      },
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
          data={this.state.products}
          columns={columns}
          isLoading={this.state.loading}
          onActionClick={this.handleActionClick}
          rowsPerPageOptions={[10]}
        />
        <ModalComp
          title="Are you sure you want to delete this category?"
          visible={visible}
          onClose={() => this.setState({ visible: false })}
          handleSubmit={() => this.handleActionDelete()}
        />
      </div>
    );
  }
}
