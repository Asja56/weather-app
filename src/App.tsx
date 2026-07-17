import logoImg from "./assets/images/logo.svg";
import "./App.css";
import Dropdown from "./components/Dropdown";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Today from "./components/Today";
import SmallCard from "./components/SmallCard";

function App() {
  return (
    <>
      <header className="flex flex-row justify-between .bg-red-500">
        <img src={logoImg} alt="logo" />

        <Dropdown></Dropdown>
      </header>
      <h1>How's the sky looking today?</h1>
      <div>
        <input id="search" placeholder="Search for a place" />
        <button>Search</button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
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
