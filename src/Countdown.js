import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 25);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="text-white">
        <span>{timeLeft.days} Days &nbsp;</span>
        <span>{timeLeft.hours} Hours &nbsp;</span>
        <span>{timeLeft.minutes} minutes &nbsp;</span>
        <span>{timeLeft.seconds} seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
