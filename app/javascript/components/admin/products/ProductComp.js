import React, { Fragment } from "react";
import HeaderComp from "../HeaderComp";
import ProductListComp from "./ProductListComp";
import LoadingAnimation from "../loading/LoadingSpinner";
import ModalComp from "../sd/ModalComp";
import ProductFilterComp from "./ProductFilterComp";
import { DiamondPlus } from "lucide-react";
import DrawerComp from "../sd/DrawerComp";
import TextFieldComp from "../sd/form/TextFieldComp";
import { toast } from "react-toastify";

export default class ProductComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletionAll: false,
      selectedRows: null,
      loading: false,
      visible: false,
      isVisibleDrawerUpdateStock: false,
      productQueryString: {},
      stockQuantity: "",
      product: []
    }

    this.productRef = React.createRef();
    this.setProductQuery = this.setProductQuery.bind(this);
    this.handleVisibleDrawerUpdateStock = this.handleVisibleDrawerUpdateStock.bind(this);
    this.handleUpdateStockforProducts = this.handleUpdateStockforProducts.bind(this);
  }

  handleSelectedRows(rows) {
    this.setState({
      selectedRows: rows
    })
  }

  handleActionConfirmDelete(selectedRows) {
    this.setState({ visible: true, selectedRows: selectedRows });
  }

  handleVisibleDrawerUpdateStock(selectedRows) {
    this.setState({
      isVisibleDrawerUpdateStock: true,
      selectedRows: selectedRows
    });

    this.renderProductInfo();
  }

  handleActionDelete() {
    const { selectedRows } = this.state;

    if (!selectedRows || selectedRows.length === 0) {
      toast.error("No product selected for deletion.");
      return;
    }

    this.setState({ loading: true });

    $.ajax({
      url: `${this.props.apiProductDeleteAll}`,
      method: "DELETE",
      data: {
        product_ids: selectedRows
      },
      success: () => {
        this.setState({ visible: false });

        if (this.productRef.current) {
          this.productRef.current.getProductsList();
        }

        toast.success('Product(s) has been deleted successfully.');
      },
      error: ({ responseJSON }) => {
        toast.error(responseJSON?.error || "Error deleting product. Please try again.");
      },
      complete: () => {
        this.setState({ loading: false });
      }
    });
  }

  setProductQuery(query) {
    this.productRef.current.getProductsList(query);
  }

  setProductInfo(products) {
    this.setState({ products: products });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  renderProductInfo() {
    const { products, selectedRows } = this.state;
    const productsInfo = products?.filter(product => selectedRows?.includes(product.id));

    if (productsInfo && productsInfo.length > 0) {
      return (
        <div className="flex items-center flex-wrap gap-3">
          <h6 className="text-gray-500 text-sm">Products:</h6>
          {productsInfo.map((item, index) => (
            <div className="flex items-center flex-wrap gap-3" key={index}>
              <span className="text-gray-300 rounded-md px-2 py-0.5 text-xs bg-secondary">
                {item.name}-(Stock Quantity: {item.stock})
              </span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  }

  async handleUpdateStockforProducts(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const { products, selectedRows } = this.state;

    const productsInfo = products?.filter(product => selectedRows?.includes(product.id));

    const { stockQuantity } = this.state;

    if (!stockQuantity) {
      toast.error("Please fill the stock quantity!");
      this.setState({ loading: false });
      return;
    }

    const formData = new FormData();
    formData.append("stock", stockQuantity);

    if (productsInfo && productsInfo.length > 0) {
      productsInfo.forEach((product) => {
        formData.append('product_id[]', product.id);
      });
    } else {
      toast.error("No products selected for update.");
      this.setState({ loading: false });
      return;
    }

    try {
      await $.ajax({
        url: '/api/products/update_multiple_stocks',
        method: 'PUT',
        data: formData,
        contentType: false,
        processData: false
      });

      toast.success("Product updated successfully!");
      this.setProductQuery({});
      this.onCloseDrawer();

    } catch (error) {
      console.error('Error processing product:', error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  }

  onCloseDrawer() {
    this.setState({
      isVisibleDrawerUpdateStock: false,
      stockQuantity: '',
      selectedRows: null
    });
    this.productRef.current.refResetSelectRowsTableComp();
  }

  oncCloseModalDelete() {
    this.setState({ visible: false, selectedRows: null });
    this.productRef.current.refResetSelectRowsTableComp();
  }

  render() {
    const { selectedRows, loading, visible, isVisibleDrawerUpdateStock, stockQuantity } = this.state;
    return (
      <Fragment>
        <LoadingAnimation isVisible={loading} />
        <ProductFilterComp setProductQuery={(query) => this.setProductQuery(query)} />
        <div className="bg-white rounded-md">
          <div className="card">
            <div className="card-header">
              <HeaderComp
                title='Add Product'
                list_title='All Products List'
                link={this.props.new_admin_product_path}
                selectedRows={selectedRows}
                icon={<DiamondPlus className="w-4 h-4" />}
                handleActionConfirmDelete={(selectedRows) => this.handleActionConfirmDelete(selectedRows)}
                handleVisibleDrawerUpdateStock={(selectedRows) => this.handleVisibleDrawerUpdateStock(selectedRows)}
              />
            </div>
            <div className="card-body px-4">
              <ProductListComp
                isLoading={loading}
                ref={this.productRef}
                selectedRows={selectedRows}
                apiProductUrl={this.props.apiProductUrl}
                setProductInfo={(products) => this.setProductInfo(products)}
                handleSelectedRows={(rows) => this.handleSelectedRows(rows)}
                refResetSelectRowsTableComp={(value) => this.refResetSelectRowsTableComp(value)}
              />
            </div>
          </div>
        </div>

        <DrawerComp
          title="Update stock of products"
          subTitle="Get started by filling in the information below to create your new project."
          width="max-w-sm"
          btnTitle="Update products stock"
          onClose={() => this.onCloseDrawer()}
          visible={isVisibleDrawerUpdateStock}
          handleSubmit={() => this.handleVisibleDrawerUpdateStock()}
          handleUpdateStockforProducts={this.handleUpdateStockforProducts}
        >
          <form onSubmit={this.handleUpdateStockforProducts}>
            <div className="px-4 sm:px-6">
              <div className="my-3">
                {this.renderProductInfo()}
              </div>
              <TextFieldComp
                type="number"
                label="Stock"
                name="stockQuantity"
                id="stockQuantity"
                required={true}
                placeholder="Quantity"
                value={stockQuantity}
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </DrawerComp>
        <ModalComp
          title="Are you sure you want to delete all these products?"
          visible={visible}
          onClose={() => this.oncCloseModalDelete()}
          handleSubmit={() => this.handleActionDelete()}
        />
      </Fragment>
    )
  }
}