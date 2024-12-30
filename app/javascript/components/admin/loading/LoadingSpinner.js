import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "40px", color = "#3498db", overlayOpacity = 0.5 }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it stays on top
      }}
      className="loading-overlay"
    >
      <div
        style={{
          width: size,
          height: size,
          border: `8px solid #f3f3f3`,
          borderTop: `8px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
        className="loading-spinner"
      ></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  overlayOpacity: PropTypes.number,
};

export default LoadingSpinner;
