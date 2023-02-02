import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer from "../reducer/authReducer";


const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [state, dispatch]=useReducer(authReducer,{
        user:null,
        
    })

    useEffect(()=>{
  //check whether user exist in local storage
  const user=JSON.parse(localStorage.getItem("user"));
  if(user){
    dispatch({
      type:"LOGIN",
      payload:user,
    })
  }
    },[])
    return (
  <AuthContext.Provider value={{...state,dispatch}}>
    {children}
  </AuthContext.Provider>
    )
};

const useAuthContext= () => {
  return useContext(AuthContext);
};

export {useAuthContext,AuthContextProvider}
