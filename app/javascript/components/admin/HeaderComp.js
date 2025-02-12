import React, { Fragment } from "react";
import ButtonComp from "./sd/ButtonComp";
import { EllipsisVertical, StickyNoteIcon, Trash2Icon } from "lucide-react";

export default class HeaderComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { link, title, list_title, selectedRows, icon } = this.props;
    return (
      <Fragment>
        <div className="flex justify-between items-center px-4 py-2">
          <div>
            <h2 className="font-semibold text-lg py-3">{list_title}</h2>
          </div>
          <div className="flex items-center space-x-1">
            <ButtonComp
              title={title}
              link={link}
              type="submit"
              icon={icon}
            />

            <button
              className={`
                border border-green-400 p-2 rounded-lg text-green-500 relative top-[4px] transition-all 
                ${Array.isArray(selectedRows) && selectedRows.length > 0 ? 'hover:bg-green-500 hover:text-white' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!selectedRows?.length}
              onClick={() => Array.isArray(selectedRows) && selectedRows.length > 0 && this.props.handleVisibleDrawerUpdateStock(selectedRows)}
            >
              <span className="text-xs flex items-center gap-x-2">
                <StickyNoteIcon className="w-4 h-4" /> Update Stocks
              </span>
            </button>

            <button
              className={`
                border border-red-400 p-2 rounded-lg text-red-500 relative top-[4px] transition-all 
                ${Array.isArray(selectedRows) && selectedRows.length > 0 ? 'hover:bg-red-500 hover:text-white' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!selectedRows?.length}
              onClick={() => Array.isArray(selectedRows) && selectedRows.length > 0 && this.props.handleActionConfirmDelete(selectedRows)}
            >
              <span className="text-xs flex items-center gap-x-2">
                <Trash2Icon className="w-4 h-4" /> Delete all
              </span>
            </button>

            <div className="relative top-[3px] cursor-pointer">
              <EllipsisVertical className="text-orange-700 w-5 h-5" />
            </div>
          </div>
        </div>
        <hr className="mb-3" />
      </Fragment>
    );
  }
}
