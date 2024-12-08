import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import QuestionForm from "../components/QuestionForm";
import PollResults from "../components/PollResults ";
import PollHistory from "../components/PollHistory";
import Intervuelogo from "../UI/Intervuelogo";
import Chat from "../components/Chat";
import Modal from "../components/Modal";

const socket = io("https://socket-backend-t11z.onrender.com/");

const Teacher = () => {
  const [students, setStudents] = useState([]);
  const [pollResults, setPollResults] = useState({});
  const [pollHistory, setPollHistory] = useState([]);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);

  useEffect(() => {
    socket.on("pollResults", (results) => {
      setPollResults(results);
      setPollHistory((prevHistory) => [...prevHistory, results]);
    });

    socket.on("students", (studentsList) => {
      setStudents([...new Set(studentsList)]);
    });

    return () => {
      socket.off("pollResults");
      socket.off("students");
    };
  }, []);

  const handleKickStudent = (studentName) => {
    socket.emit("kickStudent", studentName);
  };

  return (
    <div className="h-screen w-screen py-6 px-5 md:px-20">
      <div className="lg:max-w-[55%]">
        <Intervuelogo />
        <div className="text-[40px] mt-2">
          Let’s <span className="font-semibold">Get Started</span>
        </div>
        <div className="text-[19px] opacity-50">
          You’ll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-full lg:max-w-[65%]">
          <div>
            <h2 className="text-[20px] font-semibold mb-1">Enter your question</h2>
            <QuestionForm />
            {/* <PollResults pollResults={pollResults} /> */}
            <button
              onClick={() => setIsPollModalOpen(true)}
              className="mt-4 fixed bottom-5 right-24 bg-[#5A66D1] hover:bg-[#5A66D1] text-white py-2 px-4 rounded-lg"
            >
              Poll History
            </button>
          </div>
          {/* <div className="bg-white p-2 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Current Students</h2>
            <ul>
              {students.map((student, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 border-b"
                >
                  <span className="text-lg">{student}</span>
                  <button
                    onClick={() => handleKickStudent(student)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
      <Chat user="Teacher" students={students} handleKickStudent={handleKickStudent} />
      {isPollModalOpen && (
        <Modal onClose={() => setIsPollModalOpen(false)}>
          <PollHistory pollHistory={pollHistory} />
        </Modal>
      )}
    </div>
  );
};

export default Teacher;
