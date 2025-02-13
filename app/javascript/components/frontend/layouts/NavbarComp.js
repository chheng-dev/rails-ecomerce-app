import { ChevronDownIcon, ChevronUp, FacebookIcon, HeartIcon, InstagramIcon, ShoppingCartIcon, TwitchIcon, TwitterIcon, User2Icon, YoutubeIcon } from "lucide-react";
import React, { Fragment } from "react";


export default class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="site-navbar">
          <div className="border-b border-gray-300">
            <div className="container mx-auto">
              <div className="p-3">
                <div className="flex gap-4 items-center justify-between">
                  <p className="text-xs">Welcome to Clicon online eCommerce store.</p>
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="flex items-center space-x-3 cursor-pointer border-r border-gray-300 pr-2">
                      <p className="text-xs">Follow us:</p>
                      <TwitterIcon className="w-4" />
                      <FacebookIcon className="w-4" />
                      <YoutubeIcon className="w-4" />
                      <InstagramIcon className="w-4" />
                    </div>
                    <div className="langauge-content-dropdown flex items-center gap-0.5">
                      <div className="dropdown">
                        <button className="dropbtn">
                          <div className="flex items-center gap-x-1">
                            <p className="text-sm">Eng</p>
                            <ChevronDownIcon className="icon-down w-4" />
                            <ChevronUp className="icon-up w-4 hidden" />
                          </div>
                        </button>

                        <div className="dropdown-content rounded-md text-xs">
                          <a href="#">
                            <p className="flex items-center gap-x-1 justify-center">
                              <span className="font-bold">ភាសាខ្មែរ</span>
                              <img className="w-4" src="https://assets-cdn.vtenh.com/assets/flags/km-6fcee23b87de5f2146706d18e8376388768dacd147d9d59ee8df824e5123ede4.svg" alt="cambodia flag" />
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Site logo  */}
          <div className="container mx-auto p-3">
            <div className="flex items-center justify-between">
              <div className="w-1/5">
                <h2 className="title-logo">CLICON</h2>
              </div>
              <div className="w-3/5">
                <div>
                  <input
                    type="text"
                    id="search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary focus:outline-none w-full p-2"
                    placeholder="Search for anything...."
                  />
                </div>
              </div>
              <div className="w-1/5 flex justify-end space-x-3 cursor-pointer">
                <ShoppingCartIcon className="w-5" />
                <HeartIcon className="w-5" />
                <User2Icon className="w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}