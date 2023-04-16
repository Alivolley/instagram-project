import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute() {
   // const isUserLogin = Cookies.get("access");
   const isUserLogin = true;

   return <div>{isUserLogin ? <Outlet /> : <Navigate to="/login" />}</div>;
}
