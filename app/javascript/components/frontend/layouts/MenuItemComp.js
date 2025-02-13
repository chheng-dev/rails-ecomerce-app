import { HeadsetIcon, HelpCircleIcon, MapPin, PhoneCallIcon, RefreshCw } from "lucide-react";
import React from "react";
import CategoryItemsComp from "../menus/CategoryItemsComp";

export default class MenuItemComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  render() {
    return (
      <div className="nav">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="w-4/5">
              <ul className="text-sm">
                <li>
                  <CategoryItemsComp />
                </li>
                <li>
                  <a href="#news">
                    <div className="flex items-center gap-x-1">
                      <MapPin className="w-4" />
                      <p>Track Order</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <div className="flex items-center gap-x-1">
                      <RefreshCw className="w-4" />
                      <p>Compare</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <div className="flex items-center gap-x-1">
                      <HeadsetIcon className="w-4" />
                      <p>Customer Support</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <div className="flex items-center gap-x-1">
                      <HelpCircleIcon className="w-4" />
                      <p>Need Help</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/5">
              <div className="flex justify-end items-center gap-x-1">
                <PhoneCallIcon className="w-4" />
                <p className="text-sm">+855-93-307-620</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}