import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import chatimg from "../../public/svg/chat.svg";

const socket = io("https://socket-backend-t11z.onrender.com/");

const Chat = ({ user, students = [], handleKickStudent }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const msg = { user, text: message };
    socket.emit("chatMessage", msg);
    setMessage("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 rounded-full bg-[#5A66D1] hover:bg-[#7a82cb] text-white p-3 shadow-lg z-50"
      >
        <img src={chatimg} alt="chatimg" height={30} width={30} />
      </button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 inset-0 bg-gray-900 bg-opacity-75 flex items-center h-screen w-screen justify-center z-40">
          <div className="bg-white text-black rounded-lg shadow-lg h-[500px] w-[400px]">
            <div className="p-4 flex justify-between">
              <div className="space-x-3">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`py-2 px-4 rounded ${
                    activeTab === "chat"
                      ? "border-b-4 border-[#8F64E1] font-semibold"
                      : null
                  }`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab("students")}
                  className={`py-2 px-4 rounded ${
                    activeTab === "students"
                      ? "border-b-4 border-[#8F64E1] font-semibold"
                      : null
                  }`}
                >
                  Participants
                </button>
              </div>
              <button onClick={toggleChat} className="text-gray-600 text-xl">
                &times;
              </button>
            </div>
            {activeTab === "chat" ? (
              <div>
                <div className="pt-4 px-4 h-[390px] overflow-y-scroll">
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-2 pb-2">
                      {msg.user == "Teacher" ? (
                        <div className="text-left space-y-2">
                          <div className="text-xs text-[#4F0BD3] font-semibold">
                            {msg.user}
                          </div>
                          <div className="text-md  text-white ">
                            <span className="bg-[#3A3A3B] p-2 px-4 rounded-xl">
                              {msg.text}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-right space-y-2">
                          <div className="text-xs text-[#4F0BD3]  font-semibold">
                            {msg.user}
                          </div>
                          <div className="text-md  text-white ">
                            <span className="bg-[#8F64E1] p-2 px-4 rounded-xl">
                              {msg.text}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex border-t">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow p-2 bg-gray-100 rounded-l-lg"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-[#3A3A3B] hover:bg-[#5a5a5b] text-white p-2 rounded-r-lg"
                  >
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-between px-2 ">
                  <h2 className="text-sm font-normal mb-2">Name</h2>
                  {user === "Teacher" && (<h2 className="text-sm font-normal mb-2">Action</h2>)}
                </div>

                <ul>
                  {students.map((student, index) => (
                    <li
                      key={index}
                      className="flex justify-between font-semibold items-center p-2 "
                    >
                      <span className="text-sm ">{student}</span>
                      {user === "Teacher" && (
                        <button
                          onClick={() => handleKickStudent(student)}
                          className="text-[#1D68BD] hover:border-b-2 border-[#1D68BD] text-sm"
                        >
                          Kick out
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
