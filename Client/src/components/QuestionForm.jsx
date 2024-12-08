import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("https://socket-backend-t11z.onrender.com/");

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctOption, setCorrectOption] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const filteredOptions = options.filter((option) => option.trim());
    const questionData = {
      text: question,
      options: filteredOptions,
      correctOption: filteredOptions[correctOption],
    };
    socket.emit("submitQuestion", questionData);

    // Reset the form
    setQuestion("");
    setOptions(["", ""]);
    setCorrectOption(null);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);

    // Adjust correctOption if necessary
    if (correctOption === index) setCorrectOption(null);
    else if (correctOption > index) setCorrectOption(correctOption - 1);
  };

  const isFormValid = () => {
    const validOptions = options.filter((option) => option.trim());
    return question.trim() && validOptions.length >= 2;
  };
  return (
    <form onSubmit={handleQuestionSubmit} className="">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border rounded-xl text-wrap w-full min-h-32 bg-gray-100 p-4  text-black"
        />
        <div className="flex font-semibold justify-between">
          <span>Edit Options</span>
          <span>Correct?</span>
        </div>
        {options.map((option, index) => (
          <div key={index} className="space-y-3 space-x-2 flex items-center">
            <div className="bg-[#8F64E1] w-7 text-center text-white rounded-full">{` ${
              index + 1
            }`}</div>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-3 w-full rounded-xl bg-gray-100 text-black"
            />
            <input
              type="radio"
              id={`correct-${index}`}
              name="correctOption"
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
            />
            <label htmlFor={`correct-${index}`} className="text-black">
              Yes
            </label>
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex">
          <button
            type="button"
            onClick={addOption}
            className="border px-4 py-3 ml-7 text-sm border-[#7451B6] text-[#7451B6] rounded-2xl hover:bg-[#9b4fb2] hover:text-white hover:border-white"
          >
            + Add More Option
          </button>
        <button
          type="submit"
          className={`border px-4 py-3 ml-7 text-sm border-[#7451B6] text-[#7451B6] rounded-2xl hover:bg-[#9b4fb2] hover:text-white hover:border-white ${
            isFormValid() ? "hover:bg-[#9b4fb2] hover:text-white hover:border-white " : " cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Ask Question
        </button>
      </div>
      </div>
    </form>
  );
};

export default QuestionForm;
