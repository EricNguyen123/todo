import axios from "axios";

const apiWeather = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_WEATHER_API,
});

export default apiWeather;
