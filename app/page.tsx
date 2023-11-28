"use client";
import React, { useEffect, useState } from "react";
interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Home = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const targetDate = new Date("2024-01-01");
    let timeLeft: TimeLeft = {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (targetDate > now) {
      let months =
        targetDate.getMonth() -
        now.getMonth() +
        12 * (targetDate.getFullYear() - now.getFullYear());
      if (targetDate.getDate() < now.getDate()) {
        months--;
      }

      let days = Math.floor(
        (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (months > 0) {
        now.setMonth(now.getMonth() + months);
        days = Math.floor(
          (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
      }

      timeLeft = {
        months,
        days,
        hours: Math.floor(
          ((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          ((targetDate.getTime() - now.getTime()) / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          ((targetDate.getTime() - now.getTime()) / 1000) % 60
        ),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatLabel = (value: number, singular: string, plural: string) => {
    return value === 1 ? singular : plural;
  };
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/799959/pexels-photo-799959.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-center text-pink-200">
        <h1 className="text-2xl md:text-4xl font-bold">-- Countdown to --</h1>
        <h2 className="text-xl md:text-3xl mt-2">New Year</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {(Object.keys(timeLeft) as Array<keyof TimeLeft>).map((interval) => (
          <div
            key={interval}
            className={`flex flex-col items-center justify-center p-4 bg-white bg-opacity-40 rounded-lg shadow-md w-32 h-32 ${
              interval === "seconds" && timeLeft[interval] === 0
                ? "animate-tearPage"
                : ""
            }`}
          >
            <span className="text-3xl md:text-5xl font-semibold text-pink-200">
              {timeLeft[interval]}
            </span>
            <span className="text-md md:text-lg text-pink-200 capitalize">
              {formatLabel(timeLeft[interval], interval.slice(0, -1), interval)}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
