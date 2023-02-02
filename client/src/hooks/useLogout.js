import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {

  const { dispatch } = useAuthContext();
  const navigate =useNavigate();
  const logout = () => {
    
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({
      type: "LOGOUT",
    });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return { logout };
};

export default useLogout;
