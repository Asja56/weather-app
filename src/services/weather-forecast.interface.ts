export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  country_code: string;
  admin1_id: number;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
  postcodes?: string[];
};

export type WeatherForecast = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Units;
  current: CurrentWeather;
  hourly_units: Units;
  hourly: HourlyWeather;
  daily_units: DailyUnits;
  daily: DailyWeather;
};

export type Units = {
  time: string;
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
  relative_humidity_2m: string;
  weather_code: string;
  precipitation: string;
  wind_speed_10m: string;
};

export type DailyUnits = {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_probability_max: string;
};

export type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  weather_code: number;
  precipitation: number;
  wind_speed_10m: number;
};

export type HourlyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m: number[];
  precipitation: number[];
  apparent_temperature: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
};

export type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
};
