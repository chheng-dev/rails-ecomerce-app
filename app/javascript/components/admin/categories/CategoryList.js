import React from "react";
import TableComp from "../sd/TableComp";
import CategoryService from "../../../../services/admin/CategoryService";
import { Edit3Icon, EyeIcon, Trash2Icon } from "lucide-react";
import ModalComp from "../sd/ModalComp";
import { toast } from "react-toastify";
import LoadingSpinner from "../loading/LoadingSpinner";

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      visible: false,
      selectedRow: null,
    };

    this.handleActionClick = this.handleActionClick.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    try {
      this.setState({ loading: true });
      const categories = await CategoryService.getCategories();
      this.setState({ categories, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      this.setState({ loading: false });
    }
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


  render() {
    const columns = [
      {
        label: "ID",
        key: "id",
      },
      {
        label: "Category",
        key: "name",
        render: (row) =>
          row.name ? (
            <div className="">
              <div className="flex items-center">
                <img src={row.avatar} className="bg-[#EFF2F7] p-0.5 px-2 w-16 h-16 object-contain rounded-md" />
                <span className="ml-2">{row.name}</span>
              </div>
            </div>
          ) : (
            <p></p>
          )
      },
      {
        label: "Color",
        key: "category_color",
        render: (row) =>
          row.category_color ? (
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: row.category_color.code }}
              ></span>
              <span>{row.category_color.name}</span>
            </div>
          ) : (
            "No Color"
          ),
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
          data={this.state.categories}
          columns={columns}
          isLoading={this.state.loading}
          onActionClick={this.handleActionClick}
          rowsPerPageOptions={[5, 10, 15]}
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
