import { useState, useEffect } from "react";
import InfoBoxOne from "../seperateComponents/infoBoxOne";
import InfoBoxTwo from "../seperateComponents/infoBoxTwo";
import Swapper from "../seperateComponents/swapper";

export default function GrayBg({ location }) {
  const [swapper, setSwapper] = useState(true);
  const [forecast, setForecast] = useState(null);
  const API_KEY = "a45ecad617494a71a46223032252407";

  useEffect(() => {
    if (!location) return;

    async function fetchForecast() {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=2`
        );
        const data = await res.json();
        setForecast(data.forecast.forecastday);
      } catch (err) {
        console.error("Error fetching forecast:", err);
      }
    }

    fetchForecast();
  }, [location]);

  if (!forecast) {
    return (
      <div className="bg-DarkGray h-full w-full flex flex-col items-center justify-center text-white">
        Loading weather data...
      </div>
    );
  }

  const dayData = swapper ? forecast[0].day : forecast[1].day;
  const astroData = swapper ? forecast[0].astro : forecast[1].astro;

  return (
    <div className="bg-DarkGray h-full w-full flex flex-col">
      <div className="ml-10 mt-5">
        <Swapper swapper={swapper} setSwapper={setSwapper} />
      </div>
      <div className="mx-10 mt-[91px] max-w:w-[1274px]">
        <div className="grid max-sm:grid-cols-2 grid-cols-3 gap-x-[12px] gap-y-[12px]">
          <InfoBoxOne Title="Wind" number={`${dayData.maxwind_kph} km/h`} />
          <InfoBoxOne Title="Humidity" number={`${dayData.avghumidity}%`} />
          <InfoBoxOne Title="How it feels" number={`${dayData.avgtemp_c}°C`} />
          <InfoBoxOne Title="UV index" number={dayData.uv} />
          <InfoBoxOne Title="Visibility" number={`${dayData.avgvis_km} km`} />
          <InfoBoxOne
            Title="Chance of rain"
            number={`${dayData.daily_chance_of_rain}%`}
          />
          <InfoBoxTwo
            Title="Temperature History"
            extra={`Min: ${dayData.mintemp_c}°C / Max: ${dayData.maxtemp_c}°C`}
          />
          <InfoBoxTwo
            Title="Sun"
            extra={`Sunrise: ${astroData.sunrise} / Sunset: ${astroData.sunset}`}
          />
          <InfoBoxTwo
            Title="Moon"
            extra={`Moonrise: ${astroData.moonrise} / Moonset: ${astroData.moonset}`}
          />
        </div>
      </div>
      <div className="flex mt-[91px] mx-10">
        <div className="font-light">All data provided by</div>
        <div className="font-extralight text-Primary mb-5">
          &nbsp;WeatherAPI
        </div>
      </div>
    </div>
  );
}
