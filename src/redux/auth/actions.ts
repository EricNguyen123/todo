import {
  Action,
} from "../../types/redux";
import types from "./type";

export const signin = (data: any): Action => ({
  type: types.SIGNIN,
  payload: data,
});

export const signinResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.SIGNIN_SUCCESS : types.SIGNIN_FAILED,
  payload: result,
});

export const login = (data: any): Action => ({
  type: types.LOGIN,
  payload: data,
});

export const loginResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGIN_SUCCESS : types.LOGIN_FAILED,
  payload: result,
});

export const logout = (data: any): Action => ({
  type: types.LOGOUT,
  payload: data,
});

export const logoutResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGOUT_SUCCESS : types.LOGOUT_FAILED,
  payload: result,
});
