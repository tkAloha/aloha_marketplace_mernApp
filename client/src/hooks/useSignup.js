import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const signup = async (name, email, password, conPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", {
        name: name,
        email: email,
        password: password,
        conPassword: conPassword,
        userType:"Developer"
      });
      setSuccess("Registration Successful!");
      // navigating to login page after successful registration.
      setTimeout(() => {
        navigate("/");
      }, 1500);

      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
      setSuccess("");
    }
  };

  return { error, success, isLoading, signup };
};

export default useSignup;
