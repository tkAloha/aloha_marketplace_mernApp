const profileReducer=(state,action)=>{

    const {type,payload}=action
    switch (type) {
        case "SET_PROFILES":
           return {
            ...state,
           profiles:payload
           } 
           case "SET_SINGLE_PROFILE":
           return {
            ...state,
           profile:payload
           } 
        case "CREATE_PROFILE":
           return {
           ...state,
           profiles:[...state.profiles,payload]
           } 
           case "DELETE_PROFILE":
            return { 
               ...state,
                profiles:[...state.profiles.filter(w => w._id !== payload)]
              }
              case "EDIT_PROFILE":
            const updatedProfile = payload;
            const updatedProfiles = state.profiles.map((profile)=>{
             if(profile._id === updatedProfile._id) {
              return updatedProfile
             }
             return profile
            })
            return {
              ...state,
             profiles:updatedProfiles
            }
        default:
            return state
    }
  }
  
  export default profileReducer
  