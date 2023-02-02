import React, { useEffect } from "react";
//packages
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//context
import { useAuthContext } from "./context/AuthContext";
//components
import Login from "./components/auth/Login/Login";
import Signup from "./components/auth/Signup/Signup";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserList from "./components/AdminDashboard/MainDashboard/UserList/UserList";
import AddUser from "./components/AdminDashboard/MainDashboard/AddUser/AddUser";
import DevsProfileList from "./components/DeveloperSearch/DevsProfileList/DevsProfileList";
import SingleDevProfile from "./components/DeveloperSearch/SingleDevProfile/SingleDevProfile";
import ErrorComp from "./components/ErrorComp/ErrorComp";
import EditDevProfile from "./components/DeveloperSearch/EditDevProfile/EditDevProfile";
import ResetPassword from "./components/auth/ResetPassword/ResetPassword";
import NewPassword from "./components/auth/NewPassword/NewPassword";
import axios from "axios";


const App = () => {
  const { user,dispatch } = useAuthContext();
  
  useEffect(()=>{
    const tokenExpiryCheck = async () => {
      try {
        const res = await axios.post("/auth/user-data", {
          token:user.token
        });
  
  if(res.data.data === "token expired"){

   //remove user from local storage
   localStorage.removeItem("user");

   //dispatch logout action
   dispatch({
     type: "LOGOUT",
    });
    }
      } catch (error) {
       console.log(error)
      }
    };
    if(user?.token){
      tokenExpiryCheck()
    }
   
  })
 
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
      <Route
          path="/reset/:token"
          element={
            !user ? (
              <NewPassword />
            ) : (
              <Navigate
                to={
                  user.userType === "Admin"
                    ? "/devs-profile"
                    : `/dev/profile/${user.id}`
                }
              />
            )
          }
        />
      <Route
          path="/reset-password"
          element={
            !user ? (
              <ResetPassword />
            ) : (
              <Navigate
                to={
                  user.userType === "Admin"
                    ? "/devs-profile"
                    : `/dev/profile/${user.id}`
                }
              />
            )
          }
        />
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate
                to={
                  user.userType === "Admin"
                    ? "/devs-profile"
                    : `/dev/profile/${user.id}`
                }
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            !user ? (
              <Signup />
            ) : (
              <Navigate
                to={
                  user.userType === "Admin"
                    ? "/devs-profile"
                    : `/dev/profile/${user.id}`
                }
              />
            )
          }
        />
        <Route
          path="/devs-profile"
          element={
            user ? (
              user.userType === "Admin" ? (
                <DevsProfileList />
              ) : (
                <SingleDevProfile />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dev/profile/:id"
          element={user ? <SingleDevProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/dev/edit-profile/:id"
          element={user ? <EditDevProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard"
          element={
            user ? (
              user.userType === "Admin" ? (
                <AdminDashboard />
              ) : (
                <SingleDevProfile />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="/admin-dashboard/user-list" element={<UserList />} />
          <Route path="/admin-dashboard/add-user" element={<AddUser />} />
        </Route>
        <Route path="*" element={<ErrorComp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
