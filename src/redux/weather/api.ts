import { AxiosResponse } from "axios";
import apiWeather from "../../utils/weather-api";

export const weatherApi = (data: any): Promise<AxiosResponse> => {
  return apiWeather.get("/weather", {
    params: {
      lat: data.lat,
      lon: data.lon,
      units: 'metric',
      appid: import.meta.env.VITE_REACT_APP_WEATHER_API_KEY,
    }
  });
};
