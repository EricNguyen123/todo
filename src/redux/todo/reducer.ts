import { Action, TodoState } from "../../types/redux";
import types from "./type";

const initState = {
  loading: false,
  todo: {
    id: '',
    title: '',
    content: '',
    date: '',
    time: '',
  },
  todos: [],
};

export default function authReducer(
  state: TodoState = initState,
  action: Action
) {
  switch (action.type) {
    case types.GET_TODO: {
      return { ...state, loading: true };
    }

    case types.GET_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: action.payload || undefined,
      };
    }

    case types.GET_TODO_FAILED: {
      return { ...state, loading: false };
    }

    case types.POST_TODO: {
      return { ...state, loading: true };
    }

    case types.POST_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        todo: action.payload || undefined,
        todos: [ ...state.todos, action.payload] || undefined,
      };
    }

    case types.POST_TODO_FAILED: {
      return { ...state, loading: false };
    }

    case types.DELETE_TODO: {
      return { ...state, loading: true };
    }

    case types.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        todo: action.payload || undefined,
        todos: state.todos.filter((i) => parseInt(i.id, 10) !== parseInt(action.payload.id, 10)) || undefined,
      };
    }

    case types.DELETE_TODO_FAILED: {
      return { ...state, loading: false };
    }

    case types.PUT_TODO: {
      return { ...state, loading: true };
    }

    case types.PUT_TODO_SUCCESS: {
      
      return {
        ...state,
        loading: false,
        todo: action.payload || undefined,
        todos: state.todos.map((i) => {
          if (parseInt(i.id, 10) === parseInt(action.payload.id, 10)) {
            return action.payload
          }
          return i
        }) || undefined,
      };
    }

    case types.PUT_TODO_FAILED: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}
