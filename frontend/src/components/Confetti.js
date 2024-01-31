import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useLeaderStore from "../store/leaderBoardStore";
import TextField from "@mui/material/TextField";

export default () => {
  const { width, height } = useWindowSize();
  const { highScore } = useLeaderStore();
  return (
    <>
      <div
        style={{ height: "100svh", width: "100svw" }}
        className="flex center"
      >
        <div style={{ textAlign: "center" }}>
          <Confetti />
          <h1 className="black main--color">CONGRATULATIONS</h1>
          <p className="soft fs-13">
            To update the current leader, fill and save.
          </p>
          <h1 className="black main--color fs-80">{`${highScore}`}</h1>
          <div className="flex center mb-20">
            <input
              type="text"
              className="answer--input"
              placeholder="Enter your name"
            />
          </div>
          <button className="styled--button">SAVE</button>
        </div>
      </div>
    </>
  );
};
