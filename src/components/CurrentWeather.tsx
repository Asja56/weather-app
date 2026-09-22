import "../App.css";
import type {
  CurrentWeather,
  Units,
} from "../services/weather-forecast.interface";

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
        className="h-72 px-4 py-6 font-semibold bg-[url('/bg-today-large.svg')] bg-cover bg-blue-700 rounded-xl inline-flex flex-row justify-between items-center overflow-hidden"
      >
        <div className="self-stretch flex flex-col gap-2 justify-center">
          <p className="text-3xl">{cityName ?? "--"}</p>
          <p>{date}</p>
        </div>
        <div className="text-right self-center text-6xl">
          {currentWeather ? (
            <>
              {Math.round(currentWeather.temperature_2m)}{" "}
              {units?.temperature_2m}
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default CurrentWeatherComponent;
