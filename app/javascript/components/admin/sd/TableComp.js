import React, { Component } from "react";

class TableComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      rowsPerPage: props.rowsPerPageOptions ? props.rowsPerPageOptions[0] : 5,
      selectedRows: []
    };

    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
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

  handleSelectAll(isChecked) {
    const { currentPage, rowsPerPage } = this.state;
    const { data } = this.props;

    const startRow = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startRow, startRow + rowsPerPage);

    let updatedSelectedRows;

    if (isChecked) {
      const currentPageRowIds = currentData.map((row) => row.id);
      updatedSelectedRows = [
        ...this.state.selectedRows,
        ...currentPageRowIds
      ].filter((value, index, self) => self.indexOf(value) === index);
    } else {
      const currentPageRowIds = currentData.map((row) => row.id);
      updatedSelectedRows = this.state.selectedRows.filter(
        (id) => !currentPageRowIds.includes(id)
      );
    }
    this.setState({
      selectedRows: updatedSelectedRows
    }, () => { this.props.onSelectAll(updatedSelectedRows) })
  }

  handleRowSelection(rowId) {
    this.setState((prevState) => {
      const { selectedRows } = prevState;
      if (selectedRows.includes(rowId)) {
        return { selectedRows: selectedRows.filter((id) => id !== rowId) };
      }
      return { selectedRows: [...selectedRows, rowId] }
    }, () => { this.props.onRowSelection(this.state.selectedRows); })
  }

  render() {
    const { columns, data, rowsPerPageOptions = [5, 10, 15] } = this.props;
    const { currentPage, rowsPerPage, selectedRows } = this.state;

    const totalRows = data ? data.length : 0;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startRow, startRow + rowsPerPage);

    const rowOptions = rowsPerPageOptions.map((option) => ({
      value: option,
      label: `${option} rows`,
    }));

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">No data found</span>
        </div>
      );
    }

    const pageNumbers = [];
    const maxPagesToShow = 9;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, '...');
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
    }

    return (
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {column.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 checked:text-primary focus:ring-0 rounded-md"
                      checked={selectedRows.length > 0 && currentData.every((row) => selectedRows.includes(row.id))}
                      onChange={(e) => this.handleSelectAll(e.target.checked)}
                    />
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="odd:bg-white even:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {column.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 checked:text-primary focus:ring-0 rounded-md"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => this.handleRowSelection(row.id)}
                      />
                    ) : column.render ? (
                      column.render(row, rowIndex)
                    ) : (
                      row[column.key] || ""
                    )}
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
