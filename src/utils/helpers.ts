import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { StatOptions } from "./types";

export const AxiosInstance = axios.create({
  withCredentials: true,
});

export const notify = (
  noti: string,
  hideAfter: number | null,
  variant?: any,
  statistics?: StatOptions | null
) => {
  enqueueSnackbar(noti, {
    variant: variant,
    autoHideDuration: hideAfter,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    preventDuplicate: statistics ? false : true,
    statistics: statistics,
  });
};
