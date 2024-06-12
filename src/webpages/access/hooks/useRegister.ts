import { ILoginData } from "./useLogin";
import { axiosClient } from "../../../libs/axios";
import { useMutation } from "@tanstack/react-query";
import { DefaultMutationOptions } from "../../../libs/react-query";

import qs from "qs";

export interface IRegisterData extends ILoginData {
  username: string;
}

export const useRegister = (options: DefaultMutationOptions = {}) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (registerData: IRegisterData) => {
      const registerResponse = await axiosClient.post(
        `${process.env.REACT_APP_BASE_URL}/access/register`,
        qs.stringify(registerData)
      );

      return registerResponse;
    },
    ...options,
  });
};
