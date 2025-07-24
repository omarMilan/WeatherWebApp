import { useEffect, useState } from "react";
import sun from "../../assets/sun.png";
import snow from "../../assets/snow.png";
import storm from "../../assets/storm.png";
import Raining from "../../assets/Raining.png";
import cloudy from "../../assets/cloudy.png";

export default function CurrentWeather({ location }) {
  const [weather, setWeather] = useState(null);
  const API_KEY = "a45ecad617494a71a46223032252407";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };

    if (location) fetchWeather();
  }, [location]);

  if (!weather) return <div className="text-white mt-4">Loading...</div>;

  const temp = Math.round(weather.current.temp_c);
  const condition = weather.current.condition.text;

  const getImageForCondition = (text) => {
    const lowered = text.toLowerCase();

    if (
      lowered.includes("snow") ||
      lowered.includes("ice") ||
      lowered.includes("sleet")
    )
      return snow;
    if (lowered.includes("thunder") || lowered.includes("storm")) return storm;
    if (
      lowered.includes("rain") ||
      lowered.includes("drizzle") ||
      lowered.includes("shower")
    )
      return Raining;
    if (lowered.includes("cloud")) return cloudy;
    if (lowered.includes("sun") || lowered.includes("clear")) return sun;

    return sun; // default fallback
  };

  const icon = getImageForCondition(condition);

  return (
    <div className="flex items-center justify-center flex-col gap-y-[0px]">
      <img src={icon} className="h-[32%]" />
      <div className="flex flex-row text-[64px]">
        <div className="font-semibold">{temp}</div>
        <div className="font-extralight">°</div>
        <div className="font-light">C</div>
      </div>
      <div className="text-[32px] font-semibold">{condition}</div>
      <div className="w-full h-[.8px] bg-black mt-[70px]" />
    </div>
  );
}
