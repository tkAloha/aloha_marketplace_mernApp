import { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.patch("/auth/reset-password", { email: email });
      setSuccess(res.data.msg);
      setDisabled(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <main className="container">
      <Navbar />
      <form className="reset-password" onSubmit={handleSubmit}>
        {success && (
          <div className="success">
            <p>
              {success} <span>{email}</span>
            </p>
            <small>Please check your email.</small>
          </div>
        )}
        <h3>Reset Password</h3>
        <label>Email address:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email address"
        />
        <div className="footer">
          <button disabled={disabled}>Reset Password</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
};

export default ResetPassword;
