import logoImg from "./assets/images/logo.svg";
import "./App.css";
import UnitDropdown from "./components/UnitDropdown";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SmallCard from "./components/SmallCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getWeather, searchCities } from "./services/weather-forecast";
import { useState } from "react";
import type {
  City,
  WeatherForecast,
} from "./services/weather-forecast.interface";
import CurrentWeatherComponent from "./components/CurrentWeather";

function App() {
  const [cityName, setCityName] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>();
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    setHasSearched(true);
    const cities = await searchCities(cityName);
    setSearchResults(cities);
  }

  async function getWeatherForCity(city: City) {
    const weatherForecast: WeatherForecast = await getWeather(city);
    setSelectedCity(city);
    setWeatherForecast(weatherForecast);
    setHasSearched(false);
  }

  return (
    <>
      <header className="flex flex-row justify-between .bg-red-500">
        <img src={logoImg} alt="logo" />

        <UnitDropdown></UnitDropdown>
      </header>
      <h1 className="text-4xl text-center my-10">
        How's the sky looking today?
      </h1>
      <form
        className="flex flex-row gap-2 items-start justify-center mx-48 mt-0 mb-10"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSearch();
        }}
      >
        <div className="flex flex-col gap-2 flex-1">
          <div className="bg-neutral-700 text-neutral-200 px-3 py-2 rounded-lg flex flex-row items-center ">
            <MagnifyingGlassIcon className="mr-2 w-6 h-6" />
            <input
              id="search"
              type="text"
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
              className="bg-transparent flex-1"
              placeholder="Search for a place"
            />
          </div>

          {hasSearched && (
            <div className="bg-neutral-700 text-neutral-200 px-3 py-2 rounded-lg flex flex-row items-center">
              <ul className="w-full">
                {searchResults.length > 0 ? (
                  searchResults.map((city) => (
                    <li
                      onClick={() => getWeatherForCity(city)}
                      key={city.id}
                      className="flex flex-col gap-1 flex-1 bg-neutral-600 rounded-lg p-2 my-2 hover:bg-neutral-900"
                    >
                      <p className="text-base">
                        {city.name}, {city.country}
                      </p>
                      <p className="text-xs">
                        {city.admin1} {city.postcodes?.[0]}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="text-center">No city is found</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <CurrentWeatherComponent
            cityName={selectedCity?.name}
            currentWeather={selectedCity ? weatherForecast?.current : undefined}
            units={selectedCity ? weatherForecast?.current_units : undefined}
          />
          <SmallCard
            currentWeather={selectedCity ? weatherForecast?.current : undefined}
            units={selectedCity ? weatherForecast?.current_units : undefined}
          ></SmallCard>
          <DailyForecast
            dailyWeather={selectedCity ? weatherForecast?.daily : undefined}
          ></DailyForecast>
        </div>
        <HourlyForecast
            hourlyWeather={selectedCity ? weatherForecast?.hourly : undefined}></HourlyForecast>
      </div>
    </>
  );
}

export default App;
