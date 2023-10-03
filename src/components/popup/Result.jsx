import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Result = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div style={{ borderBottom: "1px solid #ccc", width: "100%" }}>
            <div className="d-flex" style={{ padding: "24px 24px 5px 24px" }}>
              <div style={{ width: "100%" }}>
                <img
                  src="KeyboardDojo.png"
                  className="flex--item fl1 fs-headline1 v-truncate2"
                  alt=""
                  style={{ width: "170px" }}
                />

                <div className="result-div">
                  <h3>{`WPM: ${props.wpm}`}</h3>
                  <h3>{`Time spend: ${props.time}`}</h3>
                  <h3>{`Correct: ${props.correct}`}</h3>
                  <h3>{`Incorrect: ${props.incorrect}`}</h3>
                  <h3>{`Accuracy: ${props.accuracy}%`}</h3>
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => window.location.reload()}
                >
                  Restart
                </button>
              </div>

              <div className="ml12 aside-cta flex--item print:d-none">
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ cursor: "pointer" }}
                  onClick={closePopup}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && <div className="overlay"></div>}

      <style>
        {`
          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            border-radius: 5px;
            width: 500px;

          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px; /* Adjust as needed */
          }

          .popup h2 {
            margin-bottom: 10px;
          }

          .popup p {
            margin-bottom: 20px;
          }

          .popup button {
            width: 100%;
            margin: 10px 0;
          }

          
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
          }

          @media (max-width: 750px) {
            .popup {
                width: 70%; 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Result;
