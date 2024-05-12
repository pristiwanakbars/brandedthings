import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./routers";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
