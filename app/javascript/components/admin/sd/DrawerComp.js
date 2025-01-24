import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { XIcon } from "lucide-react";
import TextFieldComp from "./form/TextFieldComp";
import ButtonComp from "./ButtonComp";

const DrawerComp = ({ visible, onClose, children, title, subTitle, btnTitle, handleUpdateStockforProducts, width = 'max-w-sm' }) => {
  const animation = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0%)" : "translateX(100%)",
    config: { tension: 150, friction: 20 },
  });

  if (!visible) return null;

  return (
    <div className="relative" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <animated.div
        className="fixed inset-0 flex justify-end"
        style={animation}
      >
        <div className={`pointer-events-auto relative w-screen ${width} bg-white shadow-xl`}>
          <div className="bg-green-400">
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-col">
                  <h5 className="text-white">{title}</h5>
                  <span className="text-gray-100 text-xs">
                    {subTitle}
                  </span>
                </div>
                <XIcon className="w-6 h-6 text-white cursor-pointer" onClick={onClose} />
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col overflow-y-scroll">
            {children}
            <footer>
              <div className="absolute bottom-0 w-full border border-t-gray-200 p-4">
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <button
                      onClick={onClose}
                      className={`border border-gray-400 p-2 rounded-lg text-gray-300 relative top-[4px]`}
                    >
                      <span className="text-xs flex items-center gap-x-2">
                        Cancel
                      </span>
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={handleUpdateStockforProducts}
                      className={`bg-primary p-2 rounded-lg text-white relative top-[4px]`}
                    >
                      <span className="text-xs flex items-center gap-x-2">
                        {btnTitle}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div >
      </animated.div >
    </div >
  );
};

export default DrawerComp;
