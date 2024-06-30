
import { all, call, put, takeEvery } from "redux-saga/effects";
import { ResponseResult } from "../../types/redux";
import {
  signinResult,
  loginResult,
  logoutResult,
} from "./actions";
import {
  signinApi,
  loginApi,
  logoutApi,
} from "./api";
import types from "./type";
import config from "../../config";

function* signinSaga(props: any) {
  const { data, handleRedirectPage } = props.payload;
  const res: ResponseResult = yield call(signinApi, data);
  if (res.status === 201) {
    yield put(signinResult(res.data));
    yield handleRedirectPage(config.routes.login)
  } else {
    const isSuccess = false;
    yield put(signinResult(res, isSuccess));
  }
}

function* loginSaga(props: any) {
  const { data, handleRedirectPage } = props.payload;

  const res: ResponseResult = yield call(loginApi, data);

    if (res.status === 200) {
      yield put(loginResult(res.data));
      localStorage.setItem("data", JSON.stringify(res.data));
      yield handleRedirectPage(config.routes.home)
    } else {
      const isSuccess = false;
      yield put(loginResult(res, isSuccess));
    }
}

function* logoutSaga(props: any) {
  try {
    const { handleRedirectPage } = props.payload
    const res: ResponseResult = yield call(logoutApi);
    localStorage.clear();
    yield put(logoutResult(res.data));
    yield handleRedirectPage(config.routes.login)
  } catch (error) {
    const isSuccess = false;
    yield put(logoutResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.SIGNIN, signinSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
  ]);
}
