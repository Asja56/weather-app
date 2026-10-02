import logoImg from "./assets/images/logo.svg";
import errorImg from "./assets/images/icon-error.svg";
import retryImg from "./assets/images/icon-retry.svg";
import "./App.css";
import UnitDropdown from "./components/UnitDropdown";
import { defaultSettings, type SettingsState } from "./components/UnitDropdown";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SmallCard from "./components/SmallCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { getWeather, searchCities } from "./services/weather-forecast";
import { useEffect, useState } from "react";
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
  const [api, setApi] = useState(false);
  const [unitSettings, setUnitSettings] =
    useState<SettingsState>(defaultSettings);

  async function handleSearch() {
    setHasSearched(true);
    setApi(false);

    try {
      const cities = await searchCities(cityName);
      setSearchResults(cities);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApi(true);
    }
  }

  async function getWeatherForCity(city: City) {
    setSelectedCity(city);
    setHasSearched(false);
  }

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    async function fetchWeather(city: City) {
      setApi(false);

      try {
        const weatherForecast: WeatherForecast = await getWeather(
          city,
          unitSettings,
        );
        setWeatherForecast(weatherForecast);
      } catch (error) {
        console.error("Weather request failed:", error);
        setApi(true);
      }
    }

    void fetchWeather(selectedCity);
  }, [selectedCity, unitSettings]);

  async function activateLaser() {
    setApi(false);
  }

  return (
    <>
      <header className="flex flex-row justify-between">
        <img src={logoImg} alt="logo" className="max-w-28 lg:max-w-full" />

        <UnitDropdown
          settings={unitSettings}
          onSettingsChange={setUnitSettings}
        />
      </header>
      {!api ? (
        <>
          <h1 className="text-4xl text-center my-10">
            How's the sky looking today?
          </h1>
          <form
            className="flex flex-col lg:flex-row gap-2 items-start justify-center lg:mx-48 mt-0 mb-4 lg:mb-10"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSearch();
            }}
          >
            <div className="flex flex-col gap-2 flex-1 w-full lg:w-fit">
              <div className=" bg-neutral-700 text-neutral-200 px-2 lg:px-3 py-2 rounded-lg flex flex-row items-center focus:outline-offset-4 focus:outline-2 focus:outline-white focus:outline">
                <MagnifyingGlassIcon className="mr-2 w-6 h-6" />
                <input
                  id="search"
                  type="text"
                  value={cityName}
                  onChange={(event) => setCityName(event.target.value)}
                  className="bg-transparent flex-1 hover:cursor-pointer"
                  placeholder="Search for a place"
                />
              </div>

              {hasSearched && (
                <div className="bg-neutral-700 text-neutral-200 px-2 lg:px-3 py-2 rounded-lg flex flex-row items-center">
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
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-offset-4 focus:outline focus:outline-2 focus:outline-blue-500 w-full lg:w-fit"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-2 flex-1">
              <CurrentWeatherComponent
                cityName={selectedCity?.name}
                currentWeather={
                  selectedCity ? weatherForecast?.current : undefined
                }
                units={
                  selectedCity ? weatherForecast?.current_units : undefined
                }
              />
              <SmallCard
                currentWeather={
                  selectedCity ? weatherForecast?.current : undefined
                }
                units={
                  selectedCity ? weatherForecast?.current_units : undefined
                }
              ></SmallCard>
              <DailyForecast
                dailyWeather={selectedCity ? weatherForecast?.daily : undefined}
              ></DailyForecast>
            </div>
            <HourlyForecast
              hourlyWeather={selectedCity ? weatherForecast?.hourly : undefined}
            ></HourlyForecast>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6 h-full items-center my-16">
            <img src={errorImg} alt="logo" className="size-7" />

            <h1 className="text-4xl">Something went wrong</h1>

            <p className="">
              We couldn't connect to the server (API error). Please try again in
              a few moments.
            </p>

            <button
              type="submit"
              className="bg-neutral-800 text-white px-5 py-2 rounded-lg hover:bg-neutral-600 
              focus:outline-offset-4 focus:outline focus:outline-2 focus:outline-white
              flex gap-2"
              onClick={activateLaser}
            >
              <img src={retryImg} alt="logo" />
              Retry
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
