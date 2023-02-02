import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import "./NewPassword.scss";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/auth/new-password", {
        password: password,
        conPassword: conPassword,
        resetToken: token,
      });
      setSuccess(res.data.msg);
      setError("");
      // navigating to login page after successful password update
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <main className="container">
      <Navbar />
      <form className="new-password" onSubmit={handleSubmit}>
        {success && <div className="success">{success}</div>}
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="New password"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={(e) => setConPassword(e.target.value)}
          value={conPassword}
          placeholder="Confirm password"
        />
        <div className="footer">
          <button>Update Password</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
};

export default NewPassword;
