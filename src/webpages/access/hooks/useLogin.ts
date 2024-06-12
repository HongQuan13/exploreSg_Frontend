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
        "/access/login",
        qs.stringify(loginData)
      );

      return loginResponse;
    },
    ...options,
  });
};
