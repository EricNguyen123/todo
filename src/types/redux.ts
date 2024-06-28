export type Action = {
  type: string;
  payload?: any;
};

export type AuthState = {
  loading: boolean;
  userInfo: any | undefined;
};

export type WeatherState = {
  loading: boolean;
  weather:  any | undefined;
}

export type TodoState = {
  loading: boolean;
  todo: Todo | undefined;
  todos: Todo[];
}

type Todo = {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
}

type ErrorResponse = {
  message: string;
  name: string;
  response: {
      status: number;
      statusText: string;
      data: {
          errors: string[];
          success: boolean;
      };
  };
};

type SuccessResponse = {
  status: number;
  statusText: string;
  data: {
      errors: string[];
      success: boolean;
      screen: string;
  };
  headers: {
      'access-token': string;
      client: string;
      uid: string;
  };
};

export type ResponseResult = ErrorResponse & SuccessResponse;
