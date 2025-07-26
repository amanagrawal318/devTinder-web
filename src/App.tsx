import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import UpdatePassword from "./components/UpdatePassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Feed />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "update-profile",
          element: <EditProfile />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "connections",
          element: <Connections />,
        },
        {
          path: "requests",
          element: <Requests />,
        },
        {
          path: "update-password",
          element: <UpdatePassword />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
