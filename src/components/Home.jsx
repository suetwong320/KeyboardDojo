import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Footer from "./partial/Footer";

import Result from "./popup/Result";

function Home() {
  const paragraphs = [
    "The wise owl perched atop the ancient oak, its eyes glowing like golden orbs in the moonlight, watched silently as the nocturnal creatures emerged from their hidden realms. The silent whispers of the leaves told tales of unseen worlds, weaving a symphony of secrets untold.",
    "In a realm where dragons soared above, their scales shimmering in the sun's embrace, a lone knight ventured into the unknown, his armor clinking softly. The air was ripe with the fragrance of the myriad of flowers that danced in the gentle breeze, whispering secrets of valor and magic.",
    "The endless cascade of binary data flowed like a digital river through the labyrinth of circuits and transistors. The computer hummed softly, its artificial intelligence contemplating the vastness of human experience and the myriad mysteries of the universe, unbounded by time.",
    "A solitary beacon illuminated the boundless ocean, its rays dancing upon the water like a waltz of light. The waves, whispering stories of distant lands and ancient civilizations, cradled the vessels of explorers in their eternal embrace, guiding them through the labyrinth of the sea.",
    "Amidst the echoes of time, ancient monuments stood as guardians of history, their stones etched with the wisdom of bygone eras. The sun's golden embrace breathed life into the shadows, unveiling the forgotten tales of valor and the eternal dance of light and darkness.",
    "The velvet curtain of the night was adorned with the diamonds of the cosmos, each twinkling star a beacon in the vastness of the universe. The whispers of the celestial symphony filled the infinite space, weaving the tapestry of time and the eternal dance of the galaxies.",
    "In the serene embrace of the forest, the symphony of nature unfolded, the leaves whispering secrets of the ancient earth. The creatures of the woodlands danced in the dappled sunlight, their footsteps a melody in the eternal song of the wilderness.",
    "The silvery strands of the spider's web danced in the morning breeze, each delicate thread glistening with the tears of dawn. The forest awoke in a symphony of light, the leaves whispering tales of the nocturnal ballet and the eternal dance of the shadows.",
    "The boundless expanse of the desert whispered tales of ancient civilizations, its sands the keepers of forgotten secrets. The winds danced amongst the dunes, their melodies a symphony of the eternal and the transient, weaving the song of the sands.",
    "The whispering winds of autumn danced through the golden leaves, telling tales of harvests and feasts. The air was ripe with the fragrance of ripened fruits and the gentle hum of the world preparing for the embrace of winter's chill.",
    "In the boundless fields of the cosmos, stars danced in celestial harmony, their light the symphony of eternity. Each twinkling note told tales of worlds unseen and the eternal dance of light and darkness, woven into the fabric of the universe.",
    "The labyrinth of the mind is a realm of infinite possibilities, its corridors adorned with the tapestries of thoughts and emotions. The dance of neurons painted the canvas of consciousness with the myriad hues of experiences, weaving the symphony of self.",
    "The ancient tome lay open, its pages whispering tales of arcane wisdom and forgotten spells. The air was heavy with the fragrance of aged parchment and the echoes of the incantations that had once danced through the hallowed halls of the sanctum.",
    "The enigma of the ocean depths whispered secrets of hidden realms and ancient leviathans. The dance of the waves was a symphony of the mysterious and the known, the surface a veil between worlds, each ripple a note in the song of the sea.",
    "The city slept under the veil of the night, its heartbeat a symphony of dreams and whispers. The shadows danced amongst the towering buildings, the moonlight painting the canvas of the urban jungle with the hues of silence and solitude.",
    "In the realm of dreams, the landscapes of the imagination unfolded in a dance of shadows and light. The air was heavy with the fragrance of unseen flowers and the echoes of laughter that resonated through the corridors of the mind.",
    "The boundless sky whispered tales of adventurous spirits and winged marvels. The clouds danced in the embrace of the winds, their shapes morphing into the echoes of the dreams of the earthbound, each wisp a note in the symphony of the heavens.",
    "The realm of the mystical was a tapestry of ancient spells and enchanted lands, its fabric woven with the threads of wonder and awe. The air was ripe with the fragrance of magical herbs and the soft murmur of the elements, each whisper a secret of the arcane.",
    "The golden sands of time flowed through the ancient hourglass, each grain a whisper of the eternal dance of the ages. The air was filled with the echoes of civilizations risen and fallen, each shadow a tale of glory and ruin, woven into the fabric of history.",
    "The eternal dance of the celestial bodies painted the canvas of the cosmos with the hues of time and space. The whispers of the galaxies unfolded in a symphony of light and darkness, each twinkling star a note in the song of the universe.",
  ];

  const sentences = [
    "The moonlight danced on the tranquil sea.",
    "Leaves whispered secrets in a gentle breeze.",
    "The clock ticked away, echoing in silence.",
    "Clouds painted the sky with shadows and light.",
    "The city skyline glittered in the night.",
    "The mountain stood majestic against the skyline.",
    "The cat prowled silently through the grass.",
    "Raindrops played a sweet melody on the roof.",
    "The candle flame flickered in the darkness.",
    "Sunset painted the horizon in vibrant hues.",
    "The waves embraced the shore tenderly.",
    "The stars were diamonds in the night sky.",
    "The book held the echo of forgotten words.",
    "The deer leapt through the silent forest.",
    "The music wove a tapestry of emotion.",
    "The garden was a symphony of colors.",
    "The wind sang a lullaby through the trees.",
    "The shadows held whispers of ancient secrets.",
    "The snowflakes danced in the winter air.",
    "The flowers bloomed in a rainbow of colors.",
  ];

  const [correct, setCorrect] = React.useState(0);
  const [incorrect, setIncorrect] = React.useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [placeholder, setPlaceholder] = React.useState(
    "Click here to start typing..."
  );

  const [width, setWidth] = useState(window.innerWidth);

  const [randText, setRandText] = React.useState([]);

  const [gameover, setGameover] = React.useState(false);

  const inputRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);

  const activeSpan = useRef(null);

  const [text, setText] = useState(paragraphs);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [started, setStarted] = useState(false);

  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (width < 767) {
      setText(sentences);
    } else {
      setText(paragraphs);
    }
  }, [width]);

  useEffect(() => {
    inputRef.current.focus();
    const rand = Math.floor(Math.random() * text.length);
    setRandText(text[rand].split(""));
  }, [text]);

  useEffect(() => {
    if (activeSpan.current) {
      activeSpan.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [index]);

  // useEffect(() => {
  //   const handleBlur = () => {
  //     inputRef.current.focus();
  //   };

  //   const currentInput = inputRef.current;
  //   currentInput.addEventListener("blur", handleBlur);

  //   return () => {
  //     currentInput.removeEventListener("blur", handleBlur);
  //   };
  // }, []);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [started]);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleInput = (e) => {
    if (!started) setStarted(true);

    setPlaceholder("");
    setPlaceholder("");
    if (index + 1 <= randText.length - 1) {
      setGameover(false);
      setShowPopup(false);
    } else {
      setGameover(true);
      setShowPopup(true);
      setStarted(false);
    }

    if (gameover === false) {
      if (e.target.value === randText[index]) {
        setCorrect(correct + 1);
        setIndex(index + 1);
        console.log(randText[index]);
      } else {
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

  const getClassName = (i) => {
    let className = "letter";
    if (i < index) {
      className += incorrectIndices.includes(i) ? " incorrect" : " correct";
    } else if (i === index) {
      className += " current";
    } else {
      className += " others";
    }
    return className;
  };

  return (
    <div className="Home">
      <nav className="nav-bar" style={{ width: "100%" }}>
        <img src="/KeyboardDojo_1.png" alt="" style={{ width: "250px" }} />
      </nav>

      {showPopup && (
        <Result
          setShowPopup={setShowPopup}
          time={formatTime(elapsedTime)}
          correct={correct}
          incorrect={incorrect}
          accuracy={formatAsPercentage((correct / randText.length) * 100)}
          wpm={~~(text.length / (elapsedTime / 60000))}
        />
      )}

      <div className="language-btn-div">
        <button className="language-btn">English</button>
      </div>

      <div className="text-area">
        <div className="timer">{formatTime(elapsedTime)}</div>

        {randText.map((letter, i) => (
          <span
            key={i}
            ref={i === index ? activeSpan : null}
            className={getClassName(i)}
          >
            {letter}
          </span>
        ))}

        <div className="input-area">
          <input
            type="text"
            onChange={handleInput}
            id="input-area"
            ref={inputRef}
            placeholder={placeholder}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
