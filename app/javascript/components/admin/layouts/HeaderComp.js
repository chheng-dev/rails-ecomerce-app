import React from "react";
import { Bell, Clock, Moon, SearchIcon, SettingsIcon } from "lucide-react";

export default class HeaderComp extends React.Component {
  render() {
    return (
      <nav className="z-30 w-full relative top-0 mb-3">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="#" className="text-xl font-bold flex items-center justify-between">
                <span className="self-center whitespace-nowra text-gray-500">Welcome!</span>
              </a>
            </div>
            <div className="flex items-center gap-x-3">
              <Moon className="w-5 h-5 hover:text-primary" />
              <Bell className="w-5 h-5 hover:text-primary" />
              <SettingsIcon className="w-5 h-5 hover:text-primary" />
              <Clock className="w-5 h-5 hover:text-primary" />

              <div className="relative w-8 h-8 overflow-hidden bg-[#EAE9E9] rounded-full">
                <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>

              <form className="flex items-center max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className="w-4 h-4" />
                  </div>
                  <input type="text" id="simple-search" className="bg-[#EAE9E9] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 focus:ring-primary focus:border-primary" placeholder="Search..." required />
                </div>
              </form>

            </div>
          </div>
        </div>
      </nav>
    )
  }
}