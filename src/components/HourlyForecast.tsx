import { useState } from "react";
import "../App.css";
import type { HourlyWeather } from "../services/weather-forecast.interface";
import { getWeatherIcon } from "../services/weather-icon";
import DaysDropdown from "./DaysDropdown";

type HourlyProps = {
  hourlyWeather?: HourlyWeather;
};

const HourlyForecast = ({ hourlyWeather }: HourlyProps) => {
  const getTodayKey: string = new Intl.DateTimeFormat(navigator.language, {
    weekday: "long",
  }).format(new Date());
  const [selectedDay, setSelectedDay] = useState(getTodayKey);

  const currentHour = new Date();
  currentHour.setMinutes(0, 0, 0);

  const hours = hourlyWeather
    ? hourlyWeather.time
        .map((time, index) => {
          return {
            key: time,
            dayName: new Intl.DateTimeFormat(navigator.language, {
              weekday: "long",
            }).format(new Date(time)),
            time: new Intl.DateTimeFormat(navigator.language, {
              timeStyle: "short",
            }).format(new Date(time)),
            image: getWeatherIcon(hourlyWeather.weather_code[index]),
            temperature: Math.round(hourlyWeather.apparent_temperature[index]),
          };
        })
        .filter((hour) => {
          if (hour.dayName !== selectedDay) {
            return false;
          }

          // For today, show the current hour and future hours only.
          if (selectedDay === getTodayKey) {
            return new Date(hour.key) >= currentHour;
          }

          return true;
        })
    : [];

  const hourList = hours.map((hour) => {
    return (
      <div
        key={hour.key}
        className="w-full min-h-10 lg:min-h-16 px-4 py-2 bg-neutral-700 rounded-lg inline-flex justify-between items-center overflow-hidden"
      >
        <div className="flex justify-between items-center gap-10">
          <img
            alt="Weather icon"
            className="size-10"
            src={`/weather/icon-${hour.image}.webp`}
          />
          {hour.time}
        </div>

        <div>
          {hour.temperature}
          <sup>o</sup>
        </div>
      </div>
    );
  });

  return (
    <>
      <section className="self-stretch px-4 py-6 bg-neutral-800 rounded-lg inline-flex flex-col justify-start items-start gap-3 lg:min-w-[420px]">
        <div className="flex justify-between items-center w-full">
          <h3>Hourly forecast</h3>{" "}
          <DaysDropdown
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          ></DaysDropdown>
        </div>

        <div
          className="flex flex-col gap-2 w-full overflow-y-auto max-h-[565px]"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {hours.length > 0 ? (
            hourList
          ) : (
            <>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
              <div className="w-full min-h-10 lg:min-h-16 bg-neutral-700 rounded-lg"></div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HourlyForecast;
