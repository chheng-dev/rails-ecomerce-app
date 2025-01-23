import React from "react";
import Lottie from "lottie-react";
import emptyDataLottie from "../../../../assets/lottie/no-data.json";

const EmptyDataComp = ({ size = 150, delay = 500 }) => {
  return (
    <div
      className=""
      style={{ animationDelay: `${delay}ms` }}
    >
      <Lottie
        animationData={emptyDataLottie}
        loop={true}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </div>
  );
};

export default EmptyDataComp;
