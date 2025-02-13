import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


export default class CategoryItemsComp extends React.Component {
  render() {
    const categories = [
      { name: "Computer & Laptop", path: "#computer-laptop" },
      { name: "Smartphones & Accessories", path: "#smartphones-accessories" },
      { name: "Tablets", path: "#tablets" },
      { name: "Headphones & Earbuds", path: "#headphones-earbuds" },
      { name: "TV & Home Entertainment", path: "#tv-home-entertainment" },
      { name: "Gaming Consoles", path: "#gaming-consoles" },
      { name: "Office Supplies", path: "#office-supplies" },
      { name: "Cameras & Photography", path: "#cameras-photography" },
      { name: "Wearable Tech", path: "#wearable-tech" },
      { name: "Home Appliances", path: "#home-appliances" }
    ];

    return (
      <div className="category-dropdown">
        <div className="dropdown">
          <button className="dropbtn">
            <div className="flex items-center gap-x-1">
              <p className="text-sm">All Categories</p>
              <ChevronDown className="icon-down w-4" />
              <ChevronUp className="icon-up w-4 hidden" />
            </div>
          </button>

          <div className="dropdown-content rounded-md text-xs">
            {
              categories.map((category, index) => (
                <a href={category.path} key={index}>
                  {category.name}
                </a>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
