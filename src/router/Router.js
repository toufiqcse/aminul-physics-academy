// @ts-nocheck
import { createBrowserRouter } from "react-router-dom";
import Branch from "../components/Branch/Branch";
import Contact from "../components/Contact/Contact";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
import Programs from "../pages/programs/Programs";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/Signup/SignUp";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return fetch("headers.json");
    },
    element: <Main></Main>,
    children: [
      {
        path: "/",
        loader: async () => {
          return fetch("sliders.json");
        },
        element: <HomePage></HomePage>,
      },

      {
        path: "/branch",
        element: (
          <PrivateRoute>
            <Branch />
          </PrivateRoute>
        ),
      },
      {
        path: "/programs",
        loader: async () => {
          return fetch("programs.json");
        },
        element: (
          <PrivateRoute>
            <Programs />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/register",
        // element: <Register></Register>,
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        // element: <Login></Login>,
        element: <SignIn></SignIn>,
      },
    ],
  },
]);
export default routes;
