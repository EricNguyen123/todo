
import { all, call, put, takeEvery } from "redux-saga/effects";
import { ResponseResult } from "../../types/redux";
import {
  weatherResult,
} from "./actions";
import {
  weatherApi,
} from "./api";
import types from "./type";

function* weatherSaga(props: any) {
  const { lat, lon } = props.payload;
  const res: ResponseResult = yield call(weatherApi, { lat, lon });
  if (res.status === 200) {
    yield put(weatherResult(res.data));
  } else {
    const isSuccess = false;
    yield put(weatherResult(res, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.GET_WEATHER, weatherSaga),
  ]);
}
