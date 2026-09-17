import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let endTime = localStorage.getItem("orderEndTime");

    if (!endTime) {
      setIsActive(false);
      return;
    }

    endTime = parseInt(endTime, 10);
    setIsActive(true);

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.floor((endTime - now) / 1000);

      if (diff <= 0) {
        localStorage.removeItem("orderEndTime");
        setIsActive(false);
        setRemainingTime(0);
        navigate("/");
      } else {
        setRemainingTime(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  if (!isActive) return null;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const address = localStorage.getItem("address") || "Not available";

  return (
    <div
      title={`Delivery to: ${address}`}
      className="
        fixed bottom-5 right-5
        w-[100px] h-[100px]
        bg-[#1a1a1a] text-white
        rounded-xl shadow-lg
        flex flex-col items-center justify-center
        z-[9999]
      "
    >
      <div className="text-sm text-gray-400">ETA</div>

      <div className="text-xl font-bold text-[#ffb703] mt-1">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
