import React, { useState } from "react";
import "./AddUser.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../../context/AuthContext";
import { useUserContext } from "../../../../context/UserContext";
import { useProfileContext } from "../../../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
    conPassword: "",
  });

  const { user } = useAuthContext();
  const { dispatch } = useUserContext();
  const {  dispatch: profileDispatch } = useProfileContext();
  const navigate = useNavigate();

  //on input change
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
   
    try {
      setIsLoading(true);
      const { firstName, lastName, email, userType, password, conPassword } =
        userDetails;

      const res = await axios.post(
        "/users",
        {
          name: `${firstName} ${lastName}`,
          email: email,
          password: password,
          conPassword: conPassword,
          userType: userType,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setIsLoading(false);
      setError("");

      //adding to users context
      dispatch({
        type: "CREATE_USER",
        payload: res.data.user,
      });

      if (userType === "Developer") {
        //adding to profiles context
        profileDispatch({
          type: "CREATE_PROFILE",
          payload: res.data.profile,
        });
      }
      navigate(`/admin-dashboard/user-list`);
      //sending success message
      toast.success(`User ${firstName} ${lastName} added successfully!`);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
    
  };
  return (
    <section className="add-user">
      <h2>Add User</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              autoComplete="off"
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              autoComplete="off"
              name="lastName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="user-type"> User Type</label>
          <select
            id="user-type"
            name="userType"
            defaultValue={"DEFAULT"}
            onChange={handleChange}
          >
            <option value="DEFAULT" disabled>
              Select User Type
            </option>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirm-password"> Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            autoComplete="off"
            name="conPassword"
            onChange={handleChange}
          />
        </div>
        <button disabled={isLoading} type="submit">
          Add
        </button>
      </form>
    </section>
  );
};

export default AddUser;
