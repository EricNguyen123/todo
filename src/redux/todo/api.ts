import { AxiosResponse } from "axios";
import api from "../../utils/api";

export const getTodoApi = (data: any): Promise<AxiosResponse> => {
  return api.get(`/users/${data.userId}/todos`, {
    params: {
      search: data.searchValue,
      sortBy: data.sortBy,
      order: data.order,
      date: data.date,
      isComplete: data.isComplete,
    }
  });
};

export const postTodoApi = (data: any): Promise<AxiosResponse> => {
  return api.post("/todos", {
    ...data,
    isComplete: 0,
  });
};

export const deleteTodoApi = (data: any): Promise<AxiosResponse> => {
  return api.delete(`/users/${data.userId}/todos/${data.id}`)
};

export const putTodoApi = (data: any): Promise<AxiosResponse> => {
  return api.put(`/users/${data.userId}/todos/${data.id}`, {
    ...data,
    isComplete: data.isComplete ? data.isComplete : 0,
  });
};
