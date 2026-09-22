import "../App.css";
import type { Units, CurrentWeather } from "../services/weather-forecast.interface";

type SmallCardProps = {
  currentWeather?: CurrentWeather;
  units?: Units;
};

const SmallCard = ({ currentWeather, units }: SmallCardProps) => {
  const cardsValue = [
    { header: "Feels like", value: currentWeather?.apparent_temperature, unit: units?.apparent_temperature },
    { header: "Humidity", value: currentWeather?.relative_humidity_2m, unit: units?.relative_humidity_2m},
    { header: "Wind speed", value: currentWeather?.wind_speed_10m, unit: units?.wind_speed_10m },
    { header: "Precipitation", value: currentWeather?.precipitation, unit: units?.precipitation },
  ];

  const listItems = cardsValue.map((card) => (
    <div
      key={card.header}
      className="w-full p-4 bg-neutral-800 rounded-lg inline-flex flex-col justify-center items-start gap-3 overflow-hidden"
    >
      <div className="justify-start text-neutral-200 text-base font-normal">
        {card.header}
      </div>
      <div className="justify-start text-white">
        {card.value}
        {card.unit}
      </div>
    </div>
  ));

  return (
    <>
      <section className="grid-cols-4 grid gap-3">{listItems}</section>
    </>
  );
};

export default SmallCard;
