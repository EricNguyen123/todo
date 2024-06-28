
import { all, call, put, takeEvery } from "redux-saga/effects";
import { ResponseResult } from "../../types/redux";
import {
  getTodoResult,
  postTodoResult,
  deleteTodoResult,
  putTodoResult,
} from "./actions";
import {
  getTodoApi,
  postTodoApi,
  deleteTodoApi,
  putTodoApi,
} from "./api";
import types from "./type";
import { currentUserID } from "../../utils/user";

function* getTodoSaga(props: any) {
  const ID = currentUserID();
  console.log("props.payload",props.payload)
  const res: ResponseResult = yield call(getTodoApi, { 
    ...props.payload, 
    userId: parseInt(ID, 10),
  });

  if (res.status === 200) {
    yield put(getTodoResult(res.data));
  } else {
    const isSuccess = false;
    yield put(getTodoResult(res, isSuccess));
  }
}

function* postTodoSaga(props: any) {
  const ID = currentUserID();
  const res: ResponseResult = yield call(postTodoApi, { ...props.payload, userId: parseInt(ID, 10) });

  if (res.status === 201) {
    yield put(postTodoResult(res.data));
  } else {
    const isSuccess = false;
    yield put(postTodoResult(res, isSuccess));
  }
}

function* deleteTodoSaga(props: any) {
  const userId = currentUserID();
  const res: ResponseResult = yield call(deleteTodoApi, { ...props.payload, userId });

  if (res.status === 200) {
    yield put(deleteTodoResult({ ...res.data, isDelete: true }));
  } else {
    const isSuccess = false;
    yield put(deleteTodoResult(res, isSuccess));
  }
}

function* putTodoSaga(props: any) {
  const ID = currentUserID();
  const { handleIsComplete, ...remainingPayload } = props.payload;
  const res: ResponseResult = yield call(putTodoApi, { ...remainingPayload, userId: parseInt(ID, 10) });
  handleIsComplete && handleIsComplete();
  if (res.status === 200) {
    yield put(putTodoResult(res.data));
  } else {
    const isSuccess = false;
    yield put(putTodoResult(res, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.GET_TODO, getTodoSaga),
    takeEvery(types.POST_TODO, postTodoSaga),
    takeEvery(types.DELETE_TODO, deleteTodoSaga),
    takeEvery(types.PUT_TODO, putTodoSaga),
  ]);
}
