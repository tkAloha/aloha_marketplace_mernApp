const userReducer=(state,action)=>{
  const {type,payload}=action
  switch (type) {
      case "SET_USERS":
         return {
         users:payload
         } 
      case "CREATE_USER":
         return {
         users:[...state.users,payload]
         } 
         case "DELETE_USER":
          return { 
              users:[...state.users.filter(w => w["_id"] !== payload)]
            }
          case "EDIT_USER":
            const updatedUser = payload;
            const updatedUsers = state.users.map((user)=>{
             if(user._id === updatedUser._id) {
              return updatedUser
             }
             return user
            })
            return {
             users:updatedUsers
            }
      default:
          return state
  }
}

export default userReducer
