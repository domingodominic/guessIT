import React from "react";
import notfound from "../../src/images/notfound.png";

function Leaderboard() {
  return (
    <div className="flex center slide--right">
      <div>
        <img src={notfound} alt="not found" width={400} />
      </div>
    </div>
  );
}

export default Leaderboard;
