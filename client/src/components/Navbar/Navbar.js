import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import { abbreviateName } from "../../helpers/helperfunction";

export default function Navbar() {
  const [active, setActive] = useState(true);

  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className="container">
      <div className="logo">
        <h1 className="company-name">
          ALOHA<span>TECHNOLOGY</span>
        </h1>
        <p className="header-chip">DEV-ON-DEMAND</p>
      </div>
      <div>
        <ul className={`nav-links ${!active ? "active" : ""}`}>
          {user && user.userType === "Admin" ? (
            <li
              onClick={() => {
                setActive(true);
              }}
            >
              <NavLink to="/admin-dashboard/user-list">Dashboard</NavLink>
            </li>
          ) : null}
          {user && user.userType === "Admin" ? (
            <li
              onClick={() => {
                setActive(true);
              }}
            >
              <NavLink to="/devs-profile">Profiles</NavLink>
            </li>
          ) : null}
          <li
            onClick={() => {
              setActive(true);
            }}
          >
            <a href="https://www.alohatechnology.com/" target="_blank">
              Home
            </a>
          </li>
          <li
            onClick={() => {
              setActive(true);
            }}
          >
            <a
              href="https://www.alohatechnology.com/about-us.html"
              target="_blank"
            >
              About
            </a>
          </li>
          <li
            onClick={() => {
              setActive(true);
            }}
          >
            <a
              href="https://www.alohatechnology.com/contact-us.html"
              target="_blank"
            >
              Contact
            </a>
          </li>
          {user && (
            <li
              onClick={() => {
                setActive(true);
              }}
            >
              <span
                onClick={() => {
                  logout();
                }}
                className="logout"
              >
                Log out
              </span>
              <span className="name">{abbreviateName(user?.name)}</span>
            </li>
          )}
        </ul>
        <span
          onClick={() => {
            setActive(!active);
          }}
        >
          {active ? (
            <FaBars className="mobile-icon" />
          ) : (
            <VscClose className="mobile-icon" />
          )}
        </span>
      </div>
    </nav>
  );
}
