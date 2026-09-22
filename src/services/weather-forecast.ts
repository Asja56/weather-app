// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m

import type { City, WeatherForecast } from "./weather-forecast.interface";

const GEO_URL = "https://api.open-meteo.com/v1/forecast";
const CITY_URL = "https://geocoding-api.open-meteo.com/v1/search";

type CitySearchResponse = {
  results?: City[];
};

export async function searchCities(cityName: string): Promise<City[]> {
  const params = new URLSearchParams({ name: cityName });
  const response = await fetch(`${CITY_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`City search failed: ${response.status}`);
  }

  const data: CitySearchResponse = await response.json();
  return data.results ?? [];
}

export async function getWeather(city: City): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    hourly:
      "weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m",
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,cloud_cover,is_day",
    timezone: city.timezone,
  });
  const response = await fetch(`${GEO_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Weather cannot be fetched: ${response.status}`);
  }

  const data: WeatherForecast = await response.json();
  return data ?? [];
}
