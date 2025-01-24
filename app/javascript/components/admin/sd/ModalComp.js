import React, { Fragment } from "react";
import { animated, useSpring } from "@react-spring/web";
import { InfoIcon, XIcon } from "lucide-react";

const ModalComp = ({ visible, children, title, onClose, handleSubmit }) => {
  const animation = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.9)",
    config: { tension: 200, friction: 15 },
  });

  if (!visible) return null;

  return (
    <div className="bg-gray-700 bg-opacity-50 fixed inset-0 z-[9999999] flex justify-center items-center">
      <animated.div
        style={animation}
        id="popup-modal"
        tabIndex="-1"
        className=""
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:text-primary rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-secondary"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              {children || (
                <Fragment>
                  <InfoIcon className="mx-auto mb-4 text-red-500 w-12 h-12" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    {title}
                  </h3>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    No, cancel
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ModalComp;
