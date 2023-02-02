
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useProfileContext } from "../../../context/ProfileContext";
import {  useUserContext } from "../../../context/UserContext";
import { abbreviateName } from "../../../helpers/helperfunction";


import "./HeadDashboard.scss";

function HeadDashboard() {
  
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { profiles } = useProfileContext();



 
  return (
    <header>
      <section className="top-header">
        <div>
          <span className="header-chip">DEV-ON-DEMAND</span>
        </div>

        <Link to="/devs-profile" className="back-btn">
          Back
          <FiArrowRight />
        </Link>
      </section>
      <section className="bottom-header">
        <div>
          <h2 className="title">Dashboard</h2>
        </div>
        <div className="left-section">
          <div className="users">
            <div className="user-total">
              <p>Total Admins</p>
              <p>|</p>
              <p className="num">{users?.length-profiles?.length}</p>
            </div>
            <div className="user-total">
              <p>Total Devs</p>
              <p>|</p>
              <p className="num">{profiles?.length}</p>
            </div>
          </div>
          <span className="name">{abbreviateName(user?.name)}</span>
        </div>
      </section>
    </header>
  );
}

export default HeadDashboard;
