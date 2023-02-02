import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UpdateUser.scss";
import { BiHide, BiShow } from "react-icons/bi";
import { useUserContext } from "../../../../context/UserContext";


const UpdateUser = ( ) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user,setUser] =useState();
  const { id } = useParams();
 
  
  useEffect(()=>{
    const getUsers = async()=>{
      try {
        const user=axios.get("/users",{
          
        })
      } catch (error) {
        
      }
    }
  getUsers()
  },[])

  const [userDetails, setUserDetails] = useState({
    name:"",
    email: "",
    userType: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

 
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  //on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails)
  };

  //on cancellation
  const handleCancellation = () => {
    navigate("/admin-dashboard/user-list");
  };
  return (
    <section className="edit-user">
      <h2>Update User</h2>
      <p>{user?.name}</p>
      {console.log(user)}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            name="name"
            onChange={handleChange}
            
          />
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
          <label htmlFor="user-type"> User Type</label>
          <select id="user-type" name="userType" onChange={handleChange} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
              Select User Type
            </option>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-field pass-field">
          <label htmlFor="password">Set New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="off"
            name="password"
            onChange={handleChange}
            
          />
          <span
            className="password-icon"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>
        <div className="btn-wrapper">
          <button type="submit">Update</button>
          <button className="cancel-btn" onClick={handleCancellation}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUser;
