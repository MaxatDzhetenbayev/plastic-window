import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout, AdminLayout, ManagerLayout } from "./layouts";
import {
  Home,
  SignIn,
  Window,
  WindowCalculator,
  Admin,
  SignUp,
  Profile,
} from "../pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Manager } from "@/pages/manager/Manager";
function App() {
  const routes = createBrowserRouter([
    {
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/windows/:model",
          element: <Window />,
        },
        {
          path: "/calculator",
          element: <WindowCalculator />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },
    {
      element: <ManagerLayout />,
      children: [
        {
          path: "/manager",
          element: <Manager />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
