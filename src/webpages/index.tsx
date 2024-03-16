import axios from "axios";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./access/login";
import Register from "./access/register";
import ShowPlace from "./place";
import UpdatePlaceForm from "./place/edit";
import AllPlaces from "./place/main";
import NewPlace from "./place/new";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetail from "./profile/detail";
import OwnedPlace from "./profile/ownedPlace";
import PasswordChange from "./profile/passwordChange";
import Chat from "./message/chat";
import { useAuthContext } from "../context/authContext";

function Webpages() {
  const { authUser } = useAuthContext();
  console.log(authUser, "authUser");
  return (
    <div className="">
      <Routes>
        <Route
          path="access/login"
          element={authUser ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="access/register"
          element={authUser ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/place/new"
          element={authUser ? <NewPlace /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/place/edit/:id"
          element={
            authUser ? <UpdatePlaceForm /> : <Navigate to="/access/login" />
          }
        />
        <Route
          path="/place/detail/:id"
          element={authUser ? <ShowPlace /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/home"
          element={authUser ? <AllPlaces /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/profile/account"
          element={authUser ? <UserDetail /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/profile/ownedPlace"
          element={authUser ? <OwnedPlace /> : <Navigate to="/access/login" />}
        />
        <Route
          path="/profile/passwordChange"
          element={
            authUser ? <PasswordChange /> : <Navigate to="/access/login" />
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Webpages;
