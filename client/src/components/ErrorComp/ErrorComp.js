import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/images/error.jpg";
import "./ErrorComp.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthContext } from "../../context/AuthContext";

const ErrorComp = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <main className="container">
      <Navbar />
      <section className="error">
        <h3>Page not found!</h3>
        <img src={errorImage} alt="" />
        {user ? <button onClick={() => navigate(-1)}>Go back</button>: <button onClick={() => navigate("/")}>Login</button>}
       
      </section>
      
    </main>
  );
};

export default ErrorComp;
