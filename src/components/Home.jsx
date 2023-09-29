import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Footer from "./partial/Footer";

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
    } else {
      setGameover(true);
    }

    if (gameover === false) {
      if (e.target.value === textArr[index]) {
        setScore(score + 1);
        setCorrect(correct + 1);
        setIndex(index + 1);
        console.log(textArr[index]);
      } else {
        setScore(score - 1);
        setIncorrect(incorrect + 1);
        setIndex(index + 1);
        setIncorrectIndices([...incorrectIndices, index]);
      }
    }

    document.getElementById("input-area").value = "";
  };

  return (
    <div className="Home">
      <nav className="nav-bar">
        <p className="brand-name">KeyboardDojo</p>
      </nav>

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
      </div>

      {gameover ? (
        <>
          <h3>{`Score: ${score}`}</h3>
          <h3>{`Correct: ${correct}`}</h3>
          <h3>{`Incorrect: ${incorrect}`}</h3>
          <h3>{`Accuracy: ${~~((correct / textArr.length) * 100)}%`}</h3>
        </>
      ) : null}

      <Footer />
    </div>
  );
}

export default Home;
