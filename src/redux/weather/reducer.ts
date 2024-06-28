import { Action, WeatherState } from "../../types/redux";
import types from "./type";

const initState = {
  loading: false,
  weather: {},
};

export default function authReducer(
  state: WeatherState = initState,
  action: Action
) {
  switch (action.type) {
    case types.GET_WEATHER: {
      return { ...state, loading: true };
    }

    case types.GET_WEATHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        weather: action.payload || undefined,
      };
    }

    case types.GET_WEATHER_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
