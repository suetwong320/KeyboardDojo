import "../App.css";
import React, { useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Home() {
  const text =
    "Googleorg is fueling the next generation of scientists with a $10M grant to FIRST Robotics and REC Foundation to help 300K+ middle schoolers gain access to robotics and AI education. Learn more";

  const textArr = text.split("");

  const [score, setScore] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [index, setIndex] = React.useState(0);

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

    // Cleanup function to remove the event listener
    return () => {
      currentInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleInput = (e) => {
    console.log(e.target.value, textArr[index]);

    if (e.target.value === textArr[index]) {
      setScore(score + 1);
      setCorrect(correct + 1);
      setIndex(index + 1);
      console.log("correct");
      console.log(textArr[index]);
      document.getElementById("input-area").value = "";
    } else {
      setScore(score - 1);
      setIncorrect(incorrect + 1);
      document.getElementById("input-area").value = "";
    }
  };

  return (
    <div className="Home">
      <h1>KeyboardDojo</h1>
      <h3>{`Score: ${score}`}</h3>
      <h3>{`Correct: ${correct}`}</h3>
      <h3>{`Incorrect: ${incorrect}`}</h3>
      <h3>{`Accuracy: ${~~((correct / textArr.length) * 100)}%`}</h3>
      <div className="text-area">
        {textArr.map((letter, i) => {
          if (i < index) {
            return <span className="letter correct">{letter}</span>;
          } else if (i === index) {
            return <span className="letter current">{letter}</span>;
          } else {
            return <span className="letter others">{letter}</span>;
          }
        })}
      </div>
      <div className="input-area">
        <input
          type="text"
          onChange={handleInput}
          id="input-area"
          ref={inputRef}
          s
        />
      </div>
    </div>
  );
}

export default Home;
