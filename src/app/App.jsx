import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Home, SignIn } from "../pages";

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
		  }
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
