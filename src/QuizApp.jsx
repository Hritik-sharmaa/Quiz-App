import React, { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./Quiz.css";
import { data } from "./assets/data.js";

const QuizApp = () => {
  let [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(data[index]);
  const [answerLock, setAnswerLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);
  const opt4 = useRef(null);

  const optArray = [opt1, opt2, opt3, opt4];

  const checkAnswer = (e, ans) => {
    if (!answerLock) {
      if (questions.answer === ans) {
        e.target.classList.add("correct");
        setAnswerLock(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        setAnswerLock(true);
        optArray[questions.answer - 1].current.classList.add("correct");
      }
    }
  };

  const handleNextQuestionClick = () => {
    if (answerLock) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(index + 1);
      setQuestions(data[index + 1]);
      setAnswerLock(false);
      optArray.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const handleReplayClick = () => {
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setResult(false);
    setAnswerLock(false);
  };

  function emojiScore(scr) {
    if (scr <= 3) {
      return "😮";
    } else if (scr <= 5) {
      return "🙂";
    } else if (scr <= 8) {
      return "🥰";
    } else if (scr <= 10) {
      return "😎🎉";
    } else {
      return "🧠";
    }
  }

  return (
    <div className="quiz-app">
      <div className="main">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <>
            <p className="score-result">
              You Scored {score} out of {data.length} {emojiScore(score)}!
            </p>
            <button onClick={handleReplayClick}>Replay</button>
          </>
        ) : (
          <>
            <p className="questions">
              {index + 1}. {questions.question}
            </p>
            <ul>
              <li onClick={(e) => checkAnswer(e, 1)} ref={opt1}>
                {questions.option1}
              </li>
              <li onClick={(e) => checkAnswer(e, 2)} ref={opt2}>
                {questions.option2}
              </li>
              <li onClick={(e) => checkAnswer(e, 3)} ref={opt3}>
                {questions.option3}
              </li>
              <li onClick={(e) => checkAnswer(e, 4)} ref={opt4}>
                {questions.option4}
              </li>
            </ul>
            <button onClick={handleNextQuestionClick}>Next</button>
            <div className="index">
              {index + 1} of {data.length} Questions.
            </div>
            <span className="created-by-text">
              Created by
              <a href="https://github.com/Hritik-sharmaa" target="_blank">
                Hritik Sharma{" "}
              </a>
              <FaGithub size={19} color="black" />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
