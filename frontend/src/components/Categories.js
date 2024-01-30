import { Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLeaderStore from "../store/leaderBoardStore";
import SplashScreen from "./SplashScreen";

const categoriesInfo = [
  {
    id: 1,
    itemName: "fastfood",
    url: "https://th.bing.com/th/id/OIG1.2c2PgBenVxKT9bNcvqom?pid=ImgGn",
  },
  {
    id: 2,
    itemName: "Flags",
    url: "https://th.bing.com/th/id/OIG4.2Qkm9qKhrHDLWdOWOvak?w=270&h=270&c=6&r=0&o=5&dpr=1.9&pid=ImgGn",
  },
];

function Categories() {
  const naviagte = useNavigate();
  const { setFastfoodLeader } = useLeaderStore();
  const [loading, setLoading] = useState(false);
  const fetchLeader = async (category, id) => {
    if (id === 1) {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5555/leaderboard/getLeaderBoard",
        {
          params: {
            category,
          },
        }
      );

      if (res.status === 200) {
        setFastfoodLeader(res.data[0]);
        setLoading(false);
        naviagte("start");
      }
    }
  };

  return (
    <>
      {loading && <p>loading...</p>}
      <ul className="slide--left">
        {categoriesInfo.map(({ itemName, url, id }) => (
          <li
            key={id}
            className=" mb-20 categories--container"
            onClick={() => {
              fetchLeader(itemName, id);
            }}
          >
            <div className="textAlign-c">
              <div style={{ width: "100%" }}>
                <img
                  className="category--image"
                  src={url}
                  alt="game image"
                  style={{
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    borderRadius: "3px",
                  }}
                />

                <p className="textAlign-s pl-20 soft-r">{`Guess the ${itemName}`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
