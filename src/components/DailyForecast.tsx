import "../App.css";
import type { DailyWeather } from "../services/weather-forecast.interface";
import { getWeatherIcon } from "../services/weather-icon";

type DailyProps = {
  dailyWeather?: DailyWeather;
};

const DailyForecast = ({ dailyWeather }: DailyProps) => {
  const days = dailyWeather
    ? dailyWeather.time.map((time, index) => {
        return {
          dayName: new Intl.DateTimeFormat(navigator.language, {
            weekday: "short",
          }).format(new Date(time)),
          image: getWeatherIcon(dailyWeather.weather_code[index]),
          highestTemp: dailyWeather.temperature_2m_max[index],
          lowestTemp: dailyWeather.temperature_2m_min[index],
        };
      })
    : [];

  const listItems = days.map((day) => (
    <div
      key={day.dayName}
      className="flex-1 p-3 bg-neutral-800 rounded-lg inline-flex flex-col justify-center items-center gap-6 overflow-hidden"
    >
      <div className="text-center">{day.dayName}</div>
      <img
        alt="Weather icon"
        className="size-10"
        src={`/weather/icon-${day.image}.webp`}
      />
      <div className="w-full inline-flex justify-between items-center">
        <div>
          {day.highestTemp}
          <sup>o</sup>
        </div>
        <div>
          {day.lowestTemp}
          <sup>o</sup>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <section className="self-stretch inline-flex flex-col justify-start items-start gap-3">
        <h3 className="text-xl font-semibold">Daily forecast</h3>
        <div className="self-stretch inline-flex justify-start items-start gap-3">
          {listItems}
        </div>
      </section>
    </>
  );
};

export default DailyForecast;
