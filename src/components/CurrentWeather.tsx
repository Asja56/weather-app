import "../App.css";
import type {
  CurrentWeather,
  Units,
} from "../services/weather-forecast.interface";
import { getWeatherIcon } from "../services/weather-icon";

type CurrentWeatherProps = {
  cityName?: string;
  currentWeather?: CurrentWeather;
  units?: Units;
};

const CurrentWeatherComponent = ({
  cityName,
  currentWeather,
  units,
}: CurrentWeatherProps) => {
  const date = currentWeather
    ? new Intl.DateTimeFormat(navigator.language, {
        dateStyle: "full",
      }).format(new Date(currentWeather.time))
    : "";

  return (
    <>
      <section        
        className="min-h-40 lg:h-72 px-4 py-6 font-semibold bg-[url('/bg-today-large.svg')] bg-cover bg-blue-700 rounded-xl inline-flex flex-col lg:flex-row justify-between items-center overflow-hidden gap-3 lg:gap-0"
      >
        <div className="self-stretch flex flex-col lg:gap-2 justify-center items-center lg:items-start">
          <p className="text-2xl lg:text-3xl">{cityName ?? "--"}</p>
          <p className="text-neutral-200">{date}</p>
        </div>
        <div className="flex flex-row gap-2">
          <img
            alt="Weather icon"
            className="size-16"
            src={`/weather/icon-${getWeatherIcon(currentWeather?.weather_code ?? 0) }.webp`}
          />
          <div className="text-right self-center text-6xl lg:text-8xl italic">
          {currentWeather ? (
            <>
              {Math.round(currentWeather.temperature_2m)} {" "}
              {units?.temperature_2m}
            </>
          ) : (
            "-"
          )}
        </div>
        </div>
      </section>
    </>
  );
};

export default CurrentWeatherComponent;
