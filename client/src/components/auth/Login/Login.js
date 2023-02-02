import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import Navbar from "../../Navbar/Navbar";


import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, isLoading, login } = useLogin();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="container">
    <Navbar />
    <form className="login" onSubmit={handleSubmit}>
      <h3>Aloha Dev Marketplace Login</h3>
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <p className="forgot-password"><Link to="/reset-password">Forgot your password?</Link></p>
      <div className="footer">
        <button disabled={isLoading}>Log in</button>
        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
    </main>
  );
};

export default Login;
