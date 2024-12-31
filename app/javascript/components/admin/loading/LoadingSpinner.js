import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../assets/lottie/loading.json";

const LoadingAnimation = ({ isVisible, size = 250 }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        step={2}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </div>
  );
};

export default LoadingAnimation;
