import React, { useEffect, useState } from "react";
import { IoArrowUndoSharp } from "react-icons/io5";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaCircleQuestion } from "react-icons/fa6";
import styleIMG from "../images/Vector 2.png";
import axios from "axios";
import Lives from "./Lives";
import { useNavigate } from "react-router-dom";

function Fastfood() {
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(5);
  const [gameDone, setGameDone] = useState(false);
  const [seconds, setSeconds] = useState(1 * 60);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [data, setData] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const gameFinish = () => {
      if (seconds === 0 || lives === 0 || gameDone) {
        navigate("/confet");
      }
    };

    gameFinish();
  }, [seconds, data.length]);

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

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const generateNewItem = () => {
    if (answer === "") {
      alert("Answer should be provided.");
    } else {
      if (currentQuestion.answer === answer) {
        setPoints(points + 1);
      } else {
        setLives(lives - 1);
      }
      if (data.length <= 1) {
        setGameDone(true);
        alert("Congratulations! No more questions.");
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

  return (
    <>
      {!loading && currentQuestion.answer ? (
        <div>
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
            <h2 className="black main--color pl-20 mt-30">
              {formatTime(seconds)}
            </h2>

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
              <Lives lives={lives} />
              <p className="soft-r">{`Points: ${points}`}</p>
            </div>

            <div className="mt-50 ">
              <div className="flex center mb-20">
                <input
                  type="text"
                  className="answer--input"
                  value={answer}
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Fastfood;
