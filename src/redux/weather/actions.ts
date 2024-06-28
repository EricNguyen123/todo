import {
  Action,
} from "../../types/redux";
import types from "./type";

export const weather = (data: any): Action => ({
  type: types.GET_WEATHER,
  payload: data,
});

export const weatherResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_WEATHER_SUCCESS : types.GET_WEATHER_FAILED,
  payload: result,
});
