import { useState } from "react";
import CurrentWeather from "../seperateComponents/currentWeather";
import Search from "../seperateComponents/search";
import TimeInfo from "../seperateComponents/timeInfo";

export default function InvBg({ location, setLocation }) {
  return (
    <div className="max-sm:mx-[0px] max-sm:mt-10 mt-0 mb-0 max-sm:mb-10 mx-[22px] w-[35%] max-sm:w-full h-full items-center  justify-center flex flex-col">
      {/* Pass setLocation to Search */}
      <Search onCitySelect={setLocation} />
      <CurrentWeather location={location} />
      <TimeInfo location={location} />
    </div>
  );
}
