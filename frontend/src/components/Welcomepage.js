import React, { useState } from "react";
import "../style/style.css";
import Categories from "./Categories";
import Tabselection from "./Tabs";
import styleIMG from "../images/Vector 2.png";
import Tabs from "./Tabs";
import Leaderboard from "./Leaderboard";
function Welcomepage() {
  const [selectedTab, setSelectedTab] = useState("one");
  return (
    <div className="welcomepage--container">
      <div className="design--two--container">
        <img src={styleIMG} alt="style" />
      </div>
      <div className="design--one"></div>

      <div className="mt-30 p-10 pr-30">
        <p className="soft">Hi player, choose</p>
        <h1 className="black mt-5">CATEGORY AND LET'S START THE GAME !</h1>
      </div>
      <Tabselection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="categories--container">
        {selectedTab === "one" ? <Categories /> : <Leaderboard />}
      </div>
    </div>
  );
}

export default Welcomepage;
