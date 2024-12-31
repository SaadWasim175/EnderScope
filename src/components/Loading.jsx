import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin color="#90D5FF" />.
    </div>
  );
};

export default Loading;
