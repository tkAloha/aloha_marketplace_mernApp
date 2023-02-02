import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });

      //saving the user to local storage
      localStorage.setItem("user", JSON.stringify(res.data));

      //update the auth context
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
     
      toast.success(`Welcome ${res.data.name}`);

       //if userType is admin, than navigate to devs profile page
       if(res.data.userType === "Admin") {
        setTimeout(() => {
            navigate("/devs-profile");
          }, 500);
       }
        //if userType is developer, than navigate to dev profile page
       if(res.data.userType === "Developer") {
        setTimeout(() => {
          navigate(`/dev/profile/${res.data.id}`);
        }, 500);
       }
       

      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  return { error, isLoading, login };
};

export default useLogin;
