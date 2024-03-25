import { axiosClient } from "../../../libs/axios";
import { useMutation } from "@tanstack/react-query";
import { DefaultMutationOptions } from "../../../libs/react-query";

import qs from "qs";

export interface ILoginData {
  email: string;
  password: string;
}

export const useLogin = (options: DefaultMutationOptions = {}) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: ILoginData) => {
      const loginResponse = await axiosClient.post(
        `${process.env.REACT_APP_BASE_URL}/access/login`,
        qs.stringify(loginData)
      );

      console.log(loginResponse, "loginResponse");
      return loginResponse;
    },
    ...options,
  });
};
