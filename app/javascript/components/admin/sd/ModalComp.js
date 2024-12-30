import React, { Fragment } from "react";

const ModalContext = React.createContext();

export default class ModalComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { visible, children, title } = this.props;

    return (
      <Fragment>
        <ModalContext.Provider value={{ visible }}>
          {visible && (
            <div
              id="popup-modal"
              tabIndex="-1"
              className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <button
                    type="button"
                    onClick={this.handleClose}
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    {children || (
                      <Fragment>
                        <svg
                          className="mx-auto mb-4 text-red-500 w-12 h-12"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                          {title}
                        </h3>
                        <button
                          type="button"
                          onClick={this.props.handleSubmit}
                          className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Yes, I'm sure
                        </button>
                        <button
                          type="button"
                          onClick={this.handleClose}
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100"
                        >
                          No, cancel
                        </button>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalContext.Provider>
      </Fragment>
    );
  }
}
