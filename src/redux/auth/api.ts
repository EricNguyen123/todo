import { AxiosResponse } from "axios";
import api from "../../utils/api";

export const signinApi = (data: any): Promise<AxiosResponse> => {
  return api.post("/users", {
    email: data.email,
    password: data.password,
    full_name: data.name,
    user_name: data.username,
    phone_number: data.phoneNumber,
  });
};

export const loginApi = (data: any): Promise<AxiosResponse> => {
  return api.get("/users", {
    params: {
      user_name: data.username,
      password: data.password
    }
  });
};

export const logoutApi = (): Promise<AxiosResponse> => {
  return api.get("/users");
};

