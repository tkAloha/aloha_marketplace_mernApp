import { useContext } from "react";
import { createContext, useReducer } from "react";
import userReducer from "../reducer/userReducer";


const userContext=createContext();
const UserContextProvider=({children})=>{
    const[state,dispatch]=useReducer(userReducer,{
        users:[]
    })

return (
    <userContext.Provider value={{...state,dispatch}}>
        {children}
    </userContext.Provider>
)
}

const useUserContext =()=>{
    return useContext(userContext)
}

export {useUserContext,UserContextProvider};