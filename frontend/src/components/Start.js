import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import styleIMG from "../images/Vector 2.png";
import { useNavigate } from "react-router-dom";
import useLeaderStore from "../store/leaderBoardStore";

function Start() {
  const { fastfoodLeader } = useLeaderStore();
  const navigate = useNavigate();
  return (
    <div className="start--container flex center">
      <div className="design--two--container">
        <img src={styleIMG} alt="style" />
      </div>
      <div className="design--one"></div>

      <div className="textAlign-c">
        <img src={require("../images/start.png")} width={250} />
        <h1 className="black main--color">Let's Go</h1>
        <p className="soft">{`Ready to beat ${fastfoodLeader.score} score of player ${fastfoodLeader.name} ?`}</p>
        <button
          className="styled--button flex center"
          onClick={() => navigate("/fastfood")}
        >
          <p>READY</p>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Start;
