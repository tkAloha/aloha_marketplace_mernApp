import { useContext } from "react";
import { createContext, useReducer } from "react";
import profileReducer from "../reducer/profileReducer";


const profileContext=createContext();

const ProfileContextProvider=({children})=>{
    const[state,dispatch]=useReducer(profileReducer,{
        profiles:[],
        profile:null
    })

return (
    <profileContext.Provider value={{...state,dispatch}}>
        {children}
    </profileContext.Provider>
)
}

const useProfileContext =()=>{
    return useContext(profileContext)
}

export {useProfileContext,ProfileContextProvider};