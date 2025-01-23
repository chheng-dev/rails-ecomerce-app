import React from "react";
import TableComp from "../sd/TableComp";
import { PencilLineIcon, Trash2Icon } from "lucide-react";
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

  async getProductsList(productQueryString = {}) {
    this.setState({ loading: true });

    let query = "";
    const { productName, selectedBrandId, selectedCategoryId, startDate, endDate } = productQueryString;

    if (productName) {
      query += `product_name=${encodeURIComponent(productName)}&`;
    }

    if (selectedBrandId) {
      query += `brand_id=${encodeURIComponent(selectedBrandId)}&`;
    }

    if (selectedCategoryId) {
      query += `category_id=${encodeURIComponent(selectedCategoryId)}&`;
    }

    if (startDate) {
      query += `start_date=${encodeURIComponent(startDate)}&`;
    }

    if (startDate) {
      query += `end_date=${encodeURIComponent(endDate)}&`;
    }

    query = query.slice(0, -1);

    $.ajax({
      url: `/api/products?${query}`,
      method: 'GET',
      success: (response) => {
        if (response.success) {
          this.setState({
            products: response.attributes,
            loading: false,
            error: ''
          })
        }
        else {
          this.setState({
            loading: false,
            error: 'No products found for the selected date range.'
          });
        }
      },
      error: (xhr, status, error) => {
        console.error('Error fetching products:', error);
        this.setState({
          loading: false,
          error: 'Failed to fetch products. Please try again later.'
        });
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
    const { id } = this.state.selectedRow;

    if (!id) {
      toast.error("No product selected for deletion.");
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: true });

    $.ajax({
      url: `${this.props.apiProductUrl}/${id}`,
      method: "DELETE",
      success: () => {
        this.setState({ visible: false });
        this.getProductsList();
        toast.success('Product has been deleted successfully.');
      },
      error: ({ responseJSON }) => {
        toast.error(responseJSON?.error || "Error deleting product. Please try again.");
      },
      complete: () => this.setState({ loading: false }),
    });
  }

  activeProductImage(images) {
    if (images.length > 0) {
      const activeImage = images.find(image => image.is_active);
      return activeImage.url;
    }
    return
  }

  onSelectAll(value) {
    const selectedRows = value ? this.state.products.map((product) => product.id) : [];
    this.setState({ selectedRows });
    this.setSelectedRowsInfo(value);
  }

  onRowSelection(value) {
    this.setState({ selectedRows: value });
    this.setSelectedRowsInfo(value);
  }

  renderOptionTypes = (row) => {
    const { option_types } = row;
    if (option_types && option_types.length > 0) {
      return option_types.map((option, index) => {
        const optionValues = option.attributes.option_values.map((value, valueIndex) => (
          <span key={valueIndex} >
            {value.presentation}
            {valueIndex < option.attributes.option_values.length - 1 && ", "}
          </span >
        ));

        return (
          <div key={index}>
            <strong>{option.presentation || option.presentation}</strong>: {optionValues}
          </div>
        );
      });
    }

    return '';
  };


  setSelectedRowsInfo(selectedRows) {
    this.props.handleSelectedRows(selectedRows);
  }

  render() {
    const columns = [
      { type: "checkbox" },
      {
        label: "Product Name & Size",
        key: "name",
        render: (row) =>
          row.name ? (
            <div className="">
              <div className="flex items-center">
                <img src={this.activeProductImage(row.images)} className="bg-[#EFF2F7] p-0.5 px-2 w-12 h-12 object-contain rounded-md" />
                <div className="flex flex-col ml-2 gap-y-2">
                  <span>{row.name}</span>
                  <span className="text-xs text-gray-400">
                    {this.renderOptionTypes(row)}
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
            <button
              className="bg-secondary p-2 rounded-full"
              onClick={() => this.handleActionEditClick(row)}
            >
              <PencilLineIcon className="text-primary" size={16} />
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
          onSelectAll={(value) => this.onSelectAll(value)}
          onRowSelection={(value) => this.onRowSelection(value)}
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
