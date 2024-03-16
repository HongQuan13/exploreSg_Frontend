import { toast } from "react-toastify";

export const errorFlash = (message: string = "Something wrong!") => {
  return toast.error(message);
};

export const sucessFlash = (message: string = "Hoyay, successful!") => {
  return toast.success(message);
};

export const infoFlash = (message: string = "New things!") => {
  return toast.success(message);
};
