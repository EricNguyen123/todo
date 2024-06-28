import { Action, AuthState } from "../../types/redux";
import types from "./type";

const initState = {
  loading: false,
  userInfo: undefined,
  authenticated: false,
};

export default function authReducer(
  state: AuthState = initState,
  action: Action
) {
  switch (action.type) {
    case types.SIGNIN: {
      return { ...state, loading: true };
    }

    case types.SIGNIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data?.data || undefined,
      };
    }

    case types.SIGNIN_FAILED: {
      return { ...state, loading: false };
    }

    case types.LOGIN: {
      return { ...state, loading: true };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data?.data || undefined,
        authenticated: true,
      };
    }

    case types.LOGIN_FAILED: {
      return { ...state, loading: false };
    }

    case types.LOGOUT_SUCCESS: {
      return initState;
    }

    default:
      return state;
  }
}
