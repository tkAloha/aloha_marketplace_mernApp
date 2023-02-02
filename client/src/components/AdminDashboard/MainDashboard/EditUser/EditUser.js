import React, { useState } from "react";
import "./EditUser.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../../context/AuthContext";
import { useUserContext } from "../../../../context/UserContext";
import { useProfileContext } from "../../../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

const EditUser = ({ curUser, cancelEdit, handleEdit }) => {
  const [error, setError] = useState(null);
  const [confirmEdit, setConfirmEdit] = useState("");
  const { user,dispatch } = useAuthContext();
  const [userDetails, setUserDetails] = useState({
    name: curUser.name,
    email: curUser.email,
    userType: curUser.userType,
  });

  const { dispatch: profileDispatch } = useProfileContext();
  const { dispatch: userDispatch } = useUserContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    try {
      const res = await axios.patch(
        `/users/${curUser._id}`,
        {
          name: userDetails.name,
          email: userDetails.email,
          userType: userDetails.userType,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setError("");
      
      //update the user context, when any user is edited
      const val = { ...res.data, ...userDetails };
      userDispatch({
        type: "EDIT_USER",
        payload: val,
      });

       //update the auth context, when the user logged in is the one editing
      const newUser={...user,...userDetails}
      if(user.id === curUser._id){
        dispatch({
         type: "LOGIN",
         payload: newUser,
       });
     }
     
     //the user is developer and remains same,update profile
      if (curUser.userType === "Developer" && userDetails.userType === "Developer") {
        profileDispatch({
          type: "EDIT_PROFILE",
          payload: val,
        });
      }

      //if the user is Admin and changed to developer, add profile
      if(curUser.userType === "Admin" && userDetails.userType === "Developer"){
        profileDispatch({
          type: "CREATE_PROFILE",
          payload: val,
        });
        
      }

      //if the user is developer and changed to admin, delete profile
      if(curUser.userType === "Developer" && userDetails.userType === "Admin"){
        profileDispatch({
          type: "DELETE_PROFILE",
          payload: curUser._id,
        });
      }

      //sending success message
      toast.success(`User updated successfully!`);
      handleEdit();
    } catch (error) {
      if(error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("This email already exist!")
      }
     
      console.log(error?.response.data.message);
    }
  };
  return (
    <tr className="edit-row" key={user._id}>
      <td>
        <input
          type="text"
          defaultValue={curUser.name}
          onChange={handleChange}
          name="name"
        />
      </td>
      <td>
        <input
          type="email"
          defaultValue={curUser.email}
          onChange={handleChange}
          name="email"
        />
      </td>
      <td>
        <select
          name="userType"
          defaultValue={curUser.userType}
          onChange={handleChange}
        >
          <option value="DEFAULT" disabled>
            Select User Type
          </option>
          <option value="Developer">Developer</option>
          <option value="Admin">Admin</option>
        </select>
      </td>
      <td className="actions">
        {error && <div className="error">{error}</div>}
        <button
          className="update-btn"
          onClick={() => {
            setConfirmEdit("yes");
          }}
        >
          Update
        </button>
        <button className="cancel-btn" onClick={cancelEdit}>
          Cancel
        </button>
      </td>
      <td>
        {confirmEdit === "yes" ? (
          <div className="edit-mode">
            <p>Are you sure you want to update </p>
            {userDetails.userType ==="Developer" && curUser._id === user.id?<p className="alert">Once you change  usertype to developer, you can no longer access admin dashboard</p>:null}
            <button
              className="update-btn"
              onClick={() => {
                updateUser();
                setConfirmEdit("");
              }}
            >
              Yes, Update
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setConfirmEdit("");
              }}
            >
              cancel
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default EditUser;
