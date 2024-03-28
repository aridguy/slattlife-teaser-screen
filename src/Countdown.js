import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // Target date (April 20th)
  const targetDate = new Date("April 20, 2024 00:00:00").getTime();

  // State variables for countdown values
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Update the countdown every second
    const countdown = setInterval(() => {
      // Get current date and time
      const now = new Date().getTime();

      // Calculate the time remaining
      const timeRemaining = targetDate - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Update state with countdown values
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      // If the countdown is finished, clear the interval
      if (timeRemaining < 0) {
        clearInterval(countdown);
        console.log("Countdown ended");
      }
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(countdown);
  }); // Run once on component mount

  return (
    <div>
      <p className="text-white countdowns">
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
};

export default CountdownTimer;
