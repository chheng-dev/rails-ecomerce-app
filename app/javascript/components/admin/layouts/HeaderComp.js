import React, { Fragment } from "react";
import { Bell, Clock, HelpCircleIcon, LockKeyholeIcon, LogOut, MessageSquareMoreIcon, Moon, Search as SearchIcon, Settings as SettingsIcon, UserCircleIcon, Wallet2Icon } from "lucide-react";
import MoonIcon from "../../../../assets/images/icons/moon.svg"
import BellIcon from "../../../../assets/images/icons/notifications.svg"
import SettingIcon from "../../../../assets/images/icons/setting.svg"
import ClockIcon from "../../../../assets/images/icons/clock.svg"


export default class HeaderComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      logoutUrl: props.destroyUserSessionUrl,
      isPrimary: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    $.ajax({
      type: "DELETE",
      url: this.state.logoutUrl,
      data: {},
      success: (respone) => {
        console.log('Signed out successfully:', respone);
        window.location.href = '/'
      },
      error: (error) => {
        console.error('Error signing out:', error);
      }
    })
  }

  render() {
    return (
      <nav className="z-30 w-full relative top-0 mb-3">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="#" className="text-xl font-bold flex items-center justify-between">
                <span className="self-center whitespace-nowrap text-gray-500">Welcome {this.props.username}!</span>
              </a>
            </div>
            <div className="flex items-center gap-x-3">
              <img
                id="svgIcon"
                src={MoonIcon}
                alt="Moon Icon"
                className="w-6 h-6 cursor-pointer filter-gray"
              />
              <img
                id="svgIcon"
                src={BellIcon}
                alt="Bell Icon"
                className="w-6 h-6 cursor-pointer filter-gray"
              />
              <img
                id="svgIcon"
                src={SettingIcon}
                alt="Setting Icon"
                className="w-6 h-6 cursor-pointer filter-gray"
              />
              <img
                id="svgIcon"
                src={ClockIcon}
                alt="Clock Icon"
                className="w-6 h-6 cursor-pointer filter-gray"
              />

              {/* Profile icon with onClick handler for dropdown */}
              <div className="dropdown">
                <button className="dropbtn">
                  <svg
                    className="icon"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="dropdown-content shadow-md rounded-md">
                  <h5 className="text-inheriet font-semibold text-sm px-3 py-2">Welcome <span className="capitalize">{this.state.username}</span>!</h5>
                  <div className="my-2 cursor-pointer">
                    <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm hover:bg-gray-100">
                      <UserCircleIcon className="text-[#5d7186] w-5" />
                      <span>Profile</span>
                    </div>
                    <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm hover:bg-gray-100">
                      <MessageSquareMoreIcon className="text-[#5d7186] w-5" />
                      <span>Messages</span>
                    </div>
                    <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm hover:bg-gray-100">
                      <Wallet2Icon className="text-[#5d7186] w-5" />
                      <span>Pricing</span>
                    </div>
                    <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm hover:bg-gray-100">
                      <HelpCircleIcon className="text-[#5d7186] w-5" />
                      <span>Help</span>
                    </div>
                    <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm hover:bg-gray-100">
                      <LockKeyholeIcon className="text-[#5d7186] w-5" />
                      <span>Lock Screen</span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center justify-start gap-x-2 my-2 px-3 py-1 text-sm text-red-500 cursor-pointer" onClick={this.handleSignOut}>
                    <LogOut className="w-5" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>



              {/* Search form */}
              <form className="flex items-center max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-[#EAE9E9] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 focus:ring-primary focus:border-primary"
                    placeholder="Search..."
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
