import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"
import NavLayout from "./layouts/NavLayout"
import { NotFound } from "./components/NotFound"

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <NotFound /> },
      { path: "/", element: <Home /> },
      {
        path: "/sign-in",
        element: <SignIn />,
        errorElement: <h2>Auth Failed</h2>,
      },
      {
        path: "/user",
        children: [
          { index: true, element: <User /> },
          {
            path: ":userId",
            //works with useParams() in called element
            element: <User />,
            errorElement: <h2>User doesn't exist</h2>,
          },
        ],
      },
    ],
  },
])
