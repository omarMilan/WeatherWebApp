import { useState, useEffect, useRef } from "react";
import icon from "../../assets/searchIcon.png";

export default function Search({ onCitySelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef(null);

  // Fetch suggestions from GeoDB Cities API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=3&sort=-population`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = await res.json();
      setSuggestions(
        data.data.map(
          (city) => `${city.city}, ${city.regionCode || city.countryCode}`
        )
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounce input changes for API calls
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onCitySelect(input.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setInput(city);
    onCitySelect(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-sm:w-[341px] max-md:w-[241px] max-lg:w-[341px] max-xl:w-[441px] w-[441px]">
      <form
        onSubmit={handleSubmit}
        className="shadow-sm shadow-DarkGray border-DarkGray border-[1px] rounded-full h-[56px] bg-LightGray flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="Search Location"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="rounded-full w-full h-full bg-LightGray text-Primary px-5 text-lg focus:outline-none"
          autoComplete="off"
        />
        <button type="submit" className="mr-[25px] ml-2">
          <img src={icon} alt="Search" className=" w-[25px]" />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 top-[56px] left-0 right-0 bg-LightGray rounded-b-lg border border-DarkGray max-h-48 overflow-auto text-Primary cursor-pointer">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-300"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
