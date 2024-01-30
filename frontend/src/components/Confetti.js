import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} />
      <div style={{ height: "100svh" }} className="flex center">
        <div className="flex center">
          <h1 className="black main--color">CONGRATULATIONS</h1>
        </div>
      </div>
    </>
  );
};
