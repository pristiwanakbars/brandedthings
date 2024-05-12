import { createBrowserRouter, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import Products from "../views/Products";
import Categories from "../views/Categories";
import AddUser from "../views/AddUser";
import AddProduct from "../views/AddProduct";
import EditProducts from "../views/EditProducts";
import EditProductImage from "../views/EditProductImage";

const url = "https://phase2-aio.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (!localStorage.access_token) {
        toast.error("Please login first", { position: "bottom-right" });
        return redirect("/login");
      }
      return redirect("/products");
    },
  },
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        toast.error("You already logged in", { position: "bottom-right" });
        return redirect("/products");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        toast.error("Please login first", { position: "bottom-right" });
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/products",
        element: <Products url={url} />,
      },
      {
        path: "/products/add",
        element: <AddProduct url={url} />,
      },
      {
        path: "/products/edit/:id",
        element: <EditProducts url={url} />,
      },
      {
        path: "/products/edit/:id/image",
        element: <EditProductImage url={url} />,
      },
      {
        path: "/categories",
        element: <Categories url={url} />,
      },
      {
        path: "/users/add",
        element: <AddUser url={url} />,
      },
    ],
  },
]);

export default router;
