import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import PollResults from "../components/PollResults ";
import Chat from "../components/Chat";
import Intervuelogo from "../UI/Intervuelogo";
import loader from "../../public/svg/loader.svg";

const socket = io("https://socket-backend-t11z.onrender.com/");

const Student = () => {
  const [name, setName] = useState("");
  const [storedName, setStoredName] = useState("");
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [pollResults, setPollResults] = useState({});
  const [timer, setTimer] = useState(60);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isKickedOut, setIsKickedOut] = useState(false);
  const timerRef = useRef(null);
  const [nameAdded, setNameAdded] = useState(false);

  useEffect(() => {
    const sessionName = sessionStorage.getItem("studentName");
    if (sessionName) {
      setStoredName(sessionName);
      socket.emit("setName", sessionName);
    }

    socket.on("question", (data) => {
      setQuestion(data);
      setTimer(60);
      setShowResults(false);
      setCorrectAnswer("");
      setAnswered(false);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            if (!answered) {
              socket.emit("submitAnswer", selectedOption);
              setAnswered(true);
            }
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });

    socket.on("pollResults", (results) => {
      setPollResults(results);
    });

    socket.on("correctAnswer", (answer) => {
      setCorrectAnswer(answer);
    });

    socket.on("kicked", () => {
      sessionStorage.removeItem("studentName");
      setStoredName("");
      setIsKickedOut(true);
    });

    return () => {
      socket.off();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [answered, selectedOption]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("studentName", name);
    setStoredName(name);
    socket.emit("setName", name);
    setNameAdded(true);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    socket.emit("submitAnswer", selectedOption);
    setShowResults(true);
    setAnswered(true);
  };

  const handleWaitForNextQuestion = () => {
    setQuestion(null);
    setShowResults(false);
    setSelectedOption("");
    setPollResults({});
    setCorrectAnswer("");
    setAnswered(false);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center text-center items-center">
      {isKickedOut ? (
        <div className="text-black md:max-w-[40%] flex-col items-center justify-center text-center">
          <div className=" flex items-center justify-center">
            <Intervuelogo />
          </div>
          <h2 className="text-[40px] mt-4">
          You’ve been Kicked out !
          </h2>
          <p className="text-[19px] opacity-60">Looks like the teacher had removed you from the poll system .Please 
          Try again sometime.</p>
        </div>
      ) : (
        <>
          <div className="">
            <Intervuelogo />
          </div>
          <div className="my-7 mx-3 md:max-w-[55%] ">
            <div className="">
              {!storedName && !isKickedOut ? (
                <div className="">
                  <div className="text-[40px] mt-2">
                    Let’s <span className="font-semibold">Get Started</span>
                  </div>
                  <div className="text-[19px] mb-6 opacity-50">
                    If you’re a student, you’ll be able to{" "}
                    <span className="font-semibold">submit your answers</span>,
                    participate in live polls, and see how your responses compare
                    with your classmates
                  </div>
                  <form className=" " onSubmit={handleNameSubmit}>
                    <div className="pb-4 text-[18px]  opacity-80 text-left">
                      Enter your Name
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border p-2 w-full mb-4 bg-gray-100 rounded-lg"
                    />
                    <button
                      type="submit"
                      className=" py-3 bg-[#7765DA] text-white rounded-3xl w-[150px]"
                    >
                      continue
                    </button>
                  </form>
                </div>
              ) : question && !isKickedOut ? (
                <div className=" md:w-[55vw] w-[95vw] rounded-lg ">
                  <div className=" ">
                    <form onSubmit={handleAnswerSubmit} className="mt-4">
                      <div className="border space-y-3 rounded-lg pb-3 sha border-[#AF8FF1]">
                        <h2 className="text-md text-left font-semibold bg-gradient-to-r from-[#343434] to-[#6E6E6E] text-white py-2 px-4 rounded-t-lg">
                          {question.text}
                        </h2>
                        {question.options.map((option, index) => (
                          <label
                            key={index}
                            value={option}
                            htmlFor={`option-${index}`}
                            onClick={selectedOption === option}
                            className={`flex items-center justify-between hover:bg-white cursor-pointer border rounded-lg m-3 p-3  ${
                              selectedOption === option
                                ? "border-purple-500 bg-white"
                                : "border-gray-300"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                                  selectedOption === option
                                    ? "bg-purple-500"
                                    : "bg-gray-300 text-black"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <label
                                htmlFor={`option-${index}`}
                                className="ml-4 text-gray-700  cursor-pointer"
                              >
                                {option}
                              </label>
                            </div>
                            <input
                              type="radio"
                              id={`option-${index}`}
                              name="option"
                              value={option}
                              checked={selectedOption === option}
                              onChange={(e) => setSelectedOption(e.target.value)}
                              className="form-radio text-purple-600"
                            />
                          </label>
                        ))}
                      </div>
                      <button
                        type="submit"
                        className={`py-2 px-4 max-w-[200px] mt-4 rounded-lg text-white font-semibold ${
                          answered
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-purple-700"
                        }`}
                        disabled={answered}
                      >
                        {answered ? "Submitted" : "Submit"}
                      </button>
                    </form>
                  </div>
                  {showResults && !isKickedOut ? (
                    <div className="mt-4 py-2 px-3 bg-white flex border rounded-lg shadow-lg">
                      <div className="w-full mx-3">
                      <PollResults pollResults={pollResults} />
                      </div>
                      <div className="mt-4 min-w-[30%]">
                        <h3 className="text-sm font-bold">
                          Correct Answer: {correctAnswer}
                        </h3>
                        <div className="flex-col justify-center items-center">
                        <button
                          onClick={handleWaitForNextQuestion}
                          className="bg-gradient-to-r from-purple-500 text-sm to-purple-700 text-white py-2 px-4 rounded-lg mt-4"
                        >
                          Wait for Next Question
                        </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className=" flex-col items-center justify-center text-center space-y-5">
                  <div className="flex justify-center">
                    <img className="loader" src={loader} alt="" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    Wait for the teacher to ask questions..
                  </h2>
                </div>
              )}
            </div>
          </div>
          {nameAdded && <Chat user={storedName} />}
        </>
      )}
    </div>
  );
};

export default Student;
