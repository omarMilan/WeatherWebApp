import { useEffect, useState } from "react";

export default function TimeInfo({ location }) {
  const [localTime, setLocalTime] = useState(null);
  const API_KEY = "a45ecad617494a71a46223032252407";

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
        );
        const data = await res.json();
        setLocalTime(data.location.localtime);
      } catch (err) {
        console.error("Failed to fetch time info", err);
      }
    };

    if (location) fetchTime();
  }, [location]);

  if (!localTime)
    return (
      <div className="font-medium text-[24px] text-center">Loading...</div>
    );

  const dateObj = new Date(localTime);
  const dateFormatted = `${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}-${dateObj.getFullYear()}`;
  const timeFormatted = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dayFormatted = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="font-medium text-[24px] text-center">
      <div>{dateFormatted}</div>
      <div>
        {dayFormatted}, {timeFormatted}
      </div>
      <div>Day</div>
    </div>
  );
}
