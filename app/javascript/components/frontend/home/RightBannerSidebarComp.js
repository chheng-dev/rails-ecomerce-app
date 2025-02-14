import React from "react";

export default class RightBannerSidebarComp extends React.Component {
  render() {
    return (
      <div className="slide-item">
        <div className="image-overlay">
          <img src="https://as1.ftcdn.net/v2/jpg/07/95/01/84/1000_F_795018435_5nkOllwtJP9xDYxoIlYq8AwF2NwKmgea.jpg" alt={`Slide}`} className="right-zoom-image rounded-md" />

          <div className="overlay"></div>
          <div className="slide-text">
            <button type="button" class="mt-4 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none">
              Show Now
            </button>
          </div>
        </div>
      </div>
    )
  }
}