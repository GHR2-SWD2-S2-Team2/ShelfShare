import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import VerfiyOtp from "./components/VerfiyOTP/VerfiyOTP";
import ResendOtp from "./components/ResendOTP/ResendOTP";
import UserContextProvider from "./Context/userContext";
import Books from "./components/Books";
import BooksLayout from "./components/Books";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "profile", element: <Profile /> },
        {
          path: "books",
          element: <BooksLayout />,
          children: [
            { index: true, element: <Books /> },
            { path: "English", element: <Books /> },
            { path: "Arabic", element: <Books /> },
            { path: "Arabic-Kids", element: <Books /> },
            { path: "English-Kids", element: <Books /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "verifyOtp", element: <VerfiyOtp /> },
    { path: "resendotp", element: <ResendOtp /> },
  ]);

  return (
    <>
      <Provider store={store}>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </UserContextProvider>
      </Provider>
    </>
  );
}

export default App;
