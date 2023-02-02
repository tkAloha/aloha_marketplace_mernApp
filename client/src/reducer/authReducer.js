const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { user:payload };
      case "LOGOUT":
        return { user:null };
    default:
      return state
  }
};

export default authReducer;
