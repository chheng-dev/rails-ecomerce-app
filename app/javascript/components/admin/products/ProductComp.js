import React, { Fragment } from "react";
import HeaderComp from "../HeaderComp";
import ProductListComp from "./ProductListComp";
import LoadingAnimation from "../loading/LoadingSpinner";
import ModalComp from "../sd/ModalComp";

export default class ProductComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeletionAll: false,
      selectedRows: null,
      loading: false,
      visible: false
    }

    this.productRef = React.createRef();
  }

  handleSelectedRows(rows) {
    this.setState({
      selectedRows: rows
    })
  }

  handleActionConfirmDelete(selectedRows) {
    this.setState({ visible: true, selectedRows: selectedRows });
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


  render() {
    const { selectedRows, loading, visible } = this.state;
    return (
      <Fragment>
        <LoadingAnimation isVisible={loading} />
        <div class="bg-white rounded-md">
          <div class="card">
            <div class="card-header">
              <HeaderComp
                title='Add Product'
                list_title='All Products List'
                link={this.props.new_admin_product_path}
                selectedRows={selectedRows}
                handleActionConfirmDelete={(selectedRows) => this.handleActionConfirmDelete(selectedRows)}
              />
            </div>
            <div class="card-body px-4">
              <ProductListComp
                isLoading={loading}
                ref={this.productRef}
                apiProductUrl={this.props.apiProductUrl}
                handleSelectedRows={(rows) => this.handleSelectedRows(rows)}
              />
            </div>
          </div>
        </div>
        <ModalComp
          title="Are you sure you want to delete all these products?"
          visible={visible}
          onClose={() => this.setState({ visible: false })}
          handleSubmit={() => this.handleActionDelete()}
        />
      </Fragment>
    )
  }
}