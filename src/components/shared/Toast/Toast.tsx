import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ShowToastOptions extends ToastOptions {
  message: string;
  type?: ToastType;
}

export const showToast = ({
  message,
  type = "info",
  ...options
}: ShowToastOptions) => {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "info":
    default:
      toast.info(message, options);
  }
};
