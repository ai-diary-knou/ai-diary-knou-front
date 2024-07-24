import React from 'react';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Props for the Toast component.
 */
interface ToastProps {
  /**
   * The message to display in the toast.
   */
  message: string;
  /**
   * The type of the toast.
   */
  type?: 'success' | 'error' | 'info' | 'warning' | 'default';
  /**
   * The position of the toast on the screen.
   */
  position?: ToastPosition;
  /**
   * The time in milliseconds after which the toast will automatically close.
   */
  autoClose?: number | false;
  /**
   * Whether to hide the progress bar.
   */
  hideProgressBar?: boolean;
  /**
   * Whether to close the toast when clicked.
   */
  closeOnClick?: boolean;
  /**
   * Whether to pause the toast timer when hovering over it.
   */
  pauseOnHover?: boolean;
  /**
   * Whether the toast can be dragged.
   */
  draggable?: boolean;
  /**
   * Custom CSS class for the toast.
   */
  className?: string;
  /**
   * The click event handler for the button that triggers the toast.
   */
  onClick?: () => void;
}

/**
 * A customizable Toast component.
 *
 * @param props - The props for the Toast component.
 * @returns The rendered Toast component.
 */
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'default',
  position = 'top-right',
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  className,
  onClick,
}) => {
  const showToast = () => {
    const toastOptions = {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      className,
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  };

  return (
    <>
      <button onClick={onClick || showToast}>Show Toast</button>
      <ToastContainer />
    </>
  );
};

export default Toast;