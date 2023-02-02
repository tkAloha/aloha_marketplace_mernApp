import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../../hooks/useSignup";
import Navbar from "../../Navbar/Navbar";
import "./Signup.scss";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const { signup, error, success, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password, conPassword);
  };
  
  return (
    <main className="container">
    <Navbar />
    <form className="signup" onSubmit={handleSubmit}>
    {success && <div className="success">{success}</div>}
      <h3>Aloha Dev Marketplace Register</h3>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label htmlFor="email">Email address:</label>
      <input
        id="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label htmlFor="conPassword"> Confirm Password:</label>
      <input
        id="conPassword"
        type="password"
        onChange={(e) => setConPassword(e.target.value)}
        value={conPassword}
      />
      <div className="footer">
        <button disabled={isLoading}>Register</button>
        <p>
          Already have an account ? <Link to="/">Sign in</Link>
        </p>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
    </main>
  );
};

export default Signup;
