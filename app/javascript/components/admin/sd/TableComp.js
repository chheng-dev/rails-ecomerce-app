import React, { Component } from "react";
import Select from "react-select";

class TableComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      rowsPerPage: props.rowsPerPageOptions ? props.rowsPerPageOptions[0] : 5,
    };

    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(newPage) {
    const totalPages = Math.ceil(this.props.data.length / this.state.rowsPerPage);
    if (newPage > 0 && newPage <= totalPages) {
      this.setState({ currentPage: newPage });
    }
  }

  handleRowsPerPageChange(selectedOption) {
    this.setState({
      rowsPerPage: selectedOption.value,
      currentPage: 1,
    });
  }

  render() {
    const { columns, data, isLoading, rowsPerPageOptions = [5, 10, 15] } = this.props;
    const { currentPage, rowsPerPage } = this.state;

    const totalRows = data ? data.length : 0;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startRow, startRow + rowsPerPage);

    const rowOptions = rowsPerPageOptions.map((option) => ({
      value: option,
      label: `${option} rows`,
    }));

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">Loading...</span>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">No data found</span>
        </div>
      );
    }

    // Generate an array of page numbers with ellipsis if necessary
    const pageNumbers = [];
    const maxPagesToShow = 9;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to 9, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show 1, 2, ..., and the last page if total pages are more than 9
      if (currentPage <= 4) {
        // Show first 5 pages
        pageNumbers.push(1, 2, 3, 4, 5, '...');
      } else if (currentPage >= totalPages - 3) {
        // Show last 5 pages
        pageNumbers.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show current page, previous 2 pages, and next 2 pages
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
    }

    return (
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {column.render ? column.render(row) : row[column.key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Control */}
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-sm text-gray-600">
              Showing {startRow + 1} to {Math.min(startRow + rowsPerPage, totalRows)} of {totalRows} entries
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Previous Page Button */}
            <button
              className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => this.handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page Numbers with Ellipsis */}
            {pageNumbers.map((pageNumber, index) => (
              pageNumber === '...' ? (
                <span key={index} className="text-sm text-gray-700">...</span>
              ) : (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 text-sm rounded-md cursor-pointer ${pageNumber === currentPage
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                  onClick={() => this.handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            ))}

            {/* Next Page Button */}
            <button
              className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => this.handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Rows per page selection */}
          {/* <div>
            <Select
              className="w-40 text-sm"
              value={rowOptions.find((option) => option.value === rowsPerPage)}
              options={rowOptions}
              onChange={this.handleRowsPerPageChange}
              isSearchable={false}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default TableComp;
