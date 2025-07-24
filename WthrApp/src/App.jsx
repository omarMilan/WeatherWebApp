import { useState } from "react";
import "./App.css";
import GrayBg from "./components/Holders/grayBg";
import InvBg from "./components/Holders/invBg";

function App() {
  const [location, setLocation] = useState("New York");

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <div className="flex max-sm:flex-col flex-row w-full h-full overflow-y-auto">
        <InvBg location={location} setLocation={setLocation} />
        <GrayBg location={location} />
      </div>
    </div>
  );
}

export default App;
