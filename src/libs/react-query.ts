import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type DefaultMutationOptions<
  TMutationFnData = unknown,
  TMutationVariables = unknown,
  options extends keyof UseMutationOptions | undefined = undefined
> = Pick<
  UseMutationOptions<
    TMutationFnData,
    AxiosError | Error,
    TMutationVariables,
    unknown
  >,
  | "onSuccess"
  | "onSettled"
  | "onError"
  | (options extends keyof UseMutationOptions ? options : never)
>;
