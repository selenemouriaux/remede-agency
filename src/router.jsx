import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"
import NavLayout from "./layouts/NavLayout"
import { NotFound } from "./components/NotFound"
import SignUp from "./pages/Signup"

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "*", element: <NotFound /> },
      { path: "/", element: <Home /> },
      {
        path: "/sign-in",
        element: <SignIn />,
        errorElement: <NotFound message="Could not sign you in" />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        errorElement: <NotFound message="Could not create your account" />,
      },
      {
        path: "/my-account",
        element: <User />,
        errorElement: <NotFound message="Access problem" />,
      },
    ],
  },
])
