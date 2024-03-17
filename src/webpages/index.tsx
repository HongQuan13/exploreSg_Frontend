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
import { ProtectedLayout } from "../layout/ProtectedLayOut";
import { NonProtectedLayout } from "../layout/NonProtectedLayout";

function Webpages() {
  return (
    <div className="">
      <Routes>
        <Route element={<NonProtectedLayout fallbackRoute="/home" />}>
          <Route path="access/login" element={<Login />} />
          <Route path="access/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/place/new" element={<NewPlace />} />
          <Route path="/place/edit/:id" element={<UpdatePlaceForm />} />
          <Route path="/place/detail/:id" element={<ShowPlace />} />
          <Route path="/home" element={<AllPlaces />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/account" element={<UserDetail />} />
          <Route path="/profile/ownedPlace" element={<OwnedPlace />} />
          <Route path="/profile/passwordChange" element={<PasswordChange />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Webpages;
