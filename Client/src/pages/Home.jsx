import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Intervuelogo from "../UI/Intervuelogo";

const Home = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role) {
      navigate(`/${role}`);
    }
  };

  return (
    <div className="h-screen  flex w-full items-center justify-center">
      <div className=" flex flex-col space-y-8 mx-4 lg:max-w-[55%] items-center">
        <Intervuelogo />
        <div className="text-black text-wrap space-y-2  mb-6">
          <div className="text-[40px] text-center ">
            Welcome to the{" "}
            <span className="font-semibold">Live Polling System</span>
          </div>
          <div className=" text-[19px] opacity-50 text-center  font-normal">
            Please select the role that best describes you to begin using the
            live polling system
          </div>
        </div>
        <div className="flex items-center pt-[2em] space-x-4 w-full justify-between h-full ">
          <div
            onClick={() => setRole("student")}
            className={`flex-col border-2 ${
              role == "student" ? "border-2 border-black" : null
            }  max-w-[50%] md:h-[140px] text-wrap justify-between rounded-2xl p-5 cursor-pointer`}
          >
            <div className="text-[23px] font-semibold">I’m a Student</div>
            <div className=" mt-2 text-[16px] text-[#454545] ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </div>
          </div>
          <div
            onClick={() => setRole("teacher")}
            className={`flex-col border-2 max-w-[50%] md:h-[140px] ${
              role == "teacher" ? "border-2 border-black" : null
            } justify-between rounded-2xl p-5 cursor-pointer`}
          >
            <div className="text-[23px] font-semibold">I am a Teacher</div>

            <div className="mt-2 text-[16px] text-[#454545]">
              Submit answers and view live poll results in real-time.
            </div>
          </div>
        </div>
        <div
          onClick={handleContinue}
          className="px-[4em] py-3 bg-[#7765DA] hover:bg-[#8d82cf] text-white rounded-3xl cursor-pointer"
        >
          continue
        </div>
      </div>
    </div>
  );
};

export default Home;
