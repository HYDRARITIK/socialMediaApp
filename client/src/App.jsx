import React from "react";
import Login from "./Pages/Login/Login"; // import Login component
import Register from "./Pages/Register/Register"; // import Register component
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { DarkModeContext } from "./context/darkModeContext";
import MyProfile from "./components/myProfile/MyProfile";
import "./app.scss";

const App = () => {
  const currentUser = true;
  const darkMode = false;
  const { isDarkMode } = React.useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${isDarkMode ? "dark" : "light"}`}>
        <Navbar />
        <div
          style={{
            display: "flex",
          }}
        >
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>

          <Rightbar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/profile",
          element: <MyProfile />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
