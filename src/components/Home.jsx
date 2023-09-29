import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

import Result from "./popup/Result";

function Home() {
  // const text =
  //   "Googleorg is fueling the next generation of scientists with a $10M grant to FIRST Robotics and REC Foundation to help 300K+ middle schoolers gain access to robotics and AI education. Learn more";

  const text = "Hello";

  const textArr = text.split("");

  const [score, setScore] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [placeholder, setPlaceholder] = React.useState("Start typing...");

  const [gameover, setGameover] = React.useState(false);

  const inputRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [index, correct, incorrect]);

  useEffect(() => {
    const handleBlur = () => {
      inputRef.current.focus();
    };

    const currentInput = inputRef.current;
    currentInput.addEventListener("blur", handleBlur);

    return () => {
      currentInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleInput = (e) => {
    setPlaceholder("");
    if (index + 1 <= textArr.length - 1) {
      setGameover(false);
      setShowPopup(false);
    } else {
      setGameover(true);
      setShowPopup(true);
    }

    if (gameover === false) {
      if (e.target.value === textArr[index]) {
        // setScore(score + 1);
        setCorrect(correct + 1);
        setIndex(index + 1);
        console.log(textArr[index]);
      } else {
        // setScore(score - 1);
        setIncorrect(incorrect + 1);
        setIndex(index + 1);
        setIncorrectIndices([...incorrectIndices, index]);
      }
    }

    document.getElementById("input-area").value = "";
  };

  function formatAsPercentage(num) {
    return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100);
  }

  return (
    <div className="Home">
      <nav className="nav-bar" style={{ width: "100%" }}>
        <img src="/KeyboardDojo.png" alt="" style={{ width: "250px" }} />
      </nav>

      {showPopup && (
        <Result
          setShowPopup={setShowPopup}
          // score={score}
          correct={correct}
          incorrect={incorrect}
          accuracy={formatAsPercentage((correct / textArr.length) * 100)}
        />
      )}

      <div className="language-btn-div">
        <button className="language-btn">English</button>
      </div>
      <div className="text-area">
        {textArr.map((letter, i) => {
          let className = "letter";
          if (i < index) {
            className += incorrectIndices.includes(i)
              ? " incorrect"
              : " correct";
          } else if (i === index) {
            className += " current";
          } else {
            className += " others";
          }

          return <span className={className}>{letter}</span>;
        })}
      </div>

      <div className="input-area">
        <input
          type="text"
          onChange={handleInput}
          id="input-area"
          ref={inputRef}
          placeholder={placeholder}
        />
        {placeholder === "" ? null : (
          <FontAwesomeIcon
            icon={faKeyboard}
            shake
            style={{ color: "#fa9e00" }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
