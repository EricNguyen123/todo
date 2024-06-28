import {
  Action,
} from "../../types/redux";
import types from "./type";

export const getTodo = (data: any): Action => ({
  type: types.GET_TODO,
  payload: data,
});

export const getTodoResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_TODO_SUCCESS : types.GET_TODO_FAILED,
  payload: result,
});

export const postTodo = (data: any): Action => ({
  type: types.POST_TODO,
  payload: data,
});

export const postTodoResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.POST_TODO_SUCCESS : types.POST_TODO_FAILED,
  payload: result,
});

export const deleteTodo = (data: any): Action => ({
  type: types.DELETE_TODO,
  payload: data,
});

export const deleteTodoResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_TODO_SUCCESS : types.DELETE_TODO_FAILED,
  payload: result,
});

export const putTodo = (data: any): Action => ({
  type: types.PUT_TODO,
  payload: data,
});

export const putTodoResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.PUT_TODO_SUCCESS : types.PUT_TODO_FAILED,
  payload: result,
});
