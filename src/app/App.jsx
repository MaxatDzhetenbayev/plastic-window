import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout, AdminLayout } from "./layouts";
import {
  SignIn,
  Home,
  Window,
  WindowCalculator,
  SignUp,
  Profile,
  Admin,
} from "../pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRequest } from "@/pages/admin-request/AdminRequest";
import { AdminProduct } from "@/pages/admin-product/AdminProduct";
import { AdminDetail } from "@/pages/admin-product/AdminDetail";
import { Payment } from "@/pages/payment/Payment";
import { PaymentSuccess } from "@/pages/payment/PaymentSuccess";
import { WorkerPage } from "@/pages/worker/WorkerPage";
import { RequestsPage } from "@/pages/reqests/RequestsPage";
import { RequestDetailPage } from "@/pages/request-detail/RequestDetailPage";

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
        {
          path: "/payment/:requestId",
          element: <Payment />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccess />,
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
        {
          path: "/admin/requests",
          element: <RequestsPage />,
        },
        {
          path: "/admin/requests/:id",
          element: <RequestDetailPage />,
        },
        {
          path: "/admin/product",
          element: <AdminProduct />,
        },
        {
          path: "/admin/product/:id",
          element: <AdminDetail />,
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
