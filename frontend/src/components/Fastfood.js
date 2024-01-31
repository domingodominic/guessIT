import React, { useEffect, useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaCircleQuestion } from "react-icons/fa6";
import styleIMG from "../images/Vector 2.png";
import axios from "axios";
import Lives from "./Lives";
import useLeaderStore from "../store/leaderBoardStore";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

function Fastfood() {
  const [time, setTime] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const { setHighScore } = useLeaderStore();
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(5);
  const [gameDone, setGameDone] = useState(false);
  const [seconds, setSeconds] = useState(1 * 60);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [data, setData] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 10); // Increment time by 1
      setBuffer((prevTime) => prevTime + 10);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (time > 100) {
      setTime(0); // Reset time when it exceeds 100
      timesUP();
    }
  }, [time]);
  useEffect(() => {
    if (buffer > 100) {
      setBuffer(0); // Reset time when it exceeds 100
    }
  }, [buffer]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const gameFinish = () => {
      if (lives === 0 || gameDone) {
        setHighScore(points);
        navigate("/confet");
      }
    };

    gameFinish();
  }, [lives, gameDone]);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5555/fastfood/getData");
      setData(res.data);
      setLoading(false);
      setCurrentQuestion(getRandomQuestion(res.data));
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getRandomQuestion = (questions) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const timesUP = () => {
    if (currentQuestion.answer === answer.toLowerCase()) {
      setPoints(points + 1);
    } else {
      setLives(lives - 1);
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
    if (data.length <= 1) {
      setGameDone(true);
    } else {
      const newData = data.filter(
        ({ answer }) => answer !== currentQuestion.answer
      );
      setData(newData);
      setCurrentQuestion(getRandomQuestion(newData));
      setAnswer("");
    }
  };
  const generateNewItem = () => {
    if (answer === "") {
      alert("Answer should be provided.");
    } else {
      setTime(0);
      setBuffer(10);
      if (currentQuestion.answer === answer.toLowerCase()) {
        setPoints(points + 1);
      } else {
        setLives(lives - 1);
        setAnimate("pulse");
      }
      if (data.length <= 1) {
        setGameDone(true);
      } else {
        const newData = data.filter(
          ({ answer }) => answer !== currentQuestion.answer
        );
        setData(newData);
        setCurrentQuestion(getRandomQuestion(newData));
        setAnswer("");
      }
    }
  };

  const handlekeydown = (event) => {
    if (event.key === "Enter") {
      generateNewItem();
    }
  };

  return (
    <>
      {!loading && currentQuestion.answer ? (
        <>
          <LinearProgress
            variant="buffer"
            valueBuffer={buffer}
            value={time}
            color="inherit"
            sx={
              time <= 40
                ? { color: "green" }
                : time <= 70
                ? { color: "orange" }
                : { color: "red" }
            }
          />
          <div className="design--two--container">
            <img src={styleIMG} alt="style" />
          </div>
          <div className="design--one"></div>
          <div className="flex between margin-20 ">
            <IoArrowUndoSharp fontSize={40} color="4f6f52" />
            <div className="flex center gap-5">
              <HiMiniInformationCircle fontSize={37} color="#4f6f52" />
              <FaCircleQuestion fontSize={30} color="#4f6f52" />
            </div>
          </div>
          <div>
            <div className="flex center image--container">
              <img
                src={currentQuestion.imageUrl}
                alt="game image"
                // width={300}
                style={{
                  maxWidth: "300px",
                  minWidth: "300px",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
              />
            </div>
            <div className="flex between margin-30">
              <div className={animate ? "pulse" : ""} key={animate}>
                <Lives lives={lives} />
              </div>
              <p className="black main--color">{`Points: ${points}`}</p>
            </div>

            <div className="mt-50 ">
              <div className="flex center mb-20">
                <input
                  type="text"
                  className="answer--input"
                  value={answer}
                  onKeyDown={handlekeydown}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <button
                className="styled--button flex center mt-20 fs-15"
                onClick={generateNewItem}
              >
                GUESS
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Fastfood;
