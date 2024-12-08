import React from "react";
import star from "../../public/svg/star.svg";

const Intervuelogo = () => {
  return (
    <div className="w-[140px] flex rounded-2xl items-center justify-around bg-[#7565D9] px-4 py-2">
      <img src={star} alt="star" />
      <div className="text-sm text-white">Intervue Poll</div>
    </div>
  );
};

export default Intervuelogo;
