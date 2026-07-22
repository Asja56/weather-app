import logoImg from "./assets/images/logo.svg";
import "./App.css";
import Dropdown from "./components/Dropdown";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Today from "./components/Today";
import SmallCard from "./components/SmallCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function App() {
  return (
    <>
      <header className="flex flex-row justify-between .bg-red-500">
        <img src={logoImg} alt="logo" />

        <Dropdown></Dropdown>
      </header>
      <h1 className="text-3xl text-center my-10">
        How's the sky looking today?
      </h1>
      <div className="flex flex-row gap-2 items-center justify-center mx-12 mt-0 mb-10">
        <div className="bg-neutral-700 text-neutral-200 px-3 py-0.5 rounded-lg flex flex-row items-center flex-1">
          <MagnifyingGlassIcon className="mr-2" />
          <input
            id="search"
            className="bg-transparent flex-1"
            placeholder="Search for a place"
          />
        </div>
        <button className="bg-blue-700 text-white px-3 py-0.5 rounded-lg ">
          Search
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Today></Today>
          <SmallCard></SmallCard>
          <DailyForecast></DailyForecast>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Hourly forecast</h2>
          <HourlyForecast></HourlyForecast>
        </div>
      </div>
    </>
  );
}

export default App;
