import { ToastContainer } from "react-toastify";

const ToastProvider: React.FC = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  );
};

export default ToastProvider;
