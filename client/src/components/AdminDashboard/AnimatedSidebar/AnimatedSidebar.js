import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import React from "react";
import "./AnimatedSidebar.scss";
import { BiCollapse } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { MdDeveloperMode } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

function AnimatedSidebar() {
  const { collapseSidebar } = useProSidebar();
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <Sidebar collapsedWidth="65px">
        <Menu className="sideMenu">
          <MenuItem
            className={
              pathname === "/admin-dashboard/user-list" ? "active" : "inactive"
            }
            routerLink={<Link to="/admin-dashboard/user-list" />}
            icon={<RiDashboardFill className="icon" />}
          >
            Dashboard
          </MenuItem>
          {/* <MenuItem
            routerLink={<Link to="/devs-profile" />}
            icon={<MdDeveloperMode className="icon" />}
          >
            Developers
          </MenuItem> */}
          <MenuItem
            className={
              pathname === "/admin-dashboard/add-user" ? "active" : "inactive"
            }
            routerLink={<Link to="/admin-dashboard/add-user" />}
            icon={<IoPersonAddSharp className="icon" />}
          >
            Add User
          </MenuItem>
        </Menu>
      </Sidebar>

      <button
        className="collapsible-icon-btn"
        onClick={() => collapseSidebar()}
      >
        <BiCollapse />
      </button>
    </div>
  );
}

export default AnimatedSidebar;
