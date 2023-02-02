import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.scss";
import TableComponent from "./TableComponent/TableComponent";
import { toast } from "react-toastify";
import { HiSearch } from "react-icons/hi";
import { useUserContext } from "../../../../context/UserContext";
import { useAuthContext } from "../../../../context/AuthContext";
import { useProfileContext } from "../../../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch, users } = useUserContext();
  const { dispatch: profileDispatch } = useProfileContext();

  //fetching users
  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        //saving it to users context
        dispatch({
          type: "SET_USERS",
          payload: res.data,
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchUsers();
  }, [dispatch, users]);

  const handleDelete = (id) => {
    //deleting user
    const deleteUser = async () => {
      try {
        const res = await axios.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        
        toast.success(`User  ${res.data.name} deleted`);
        //deleting user from user context
        dispatch({
          type: "DELETE_USER",
          payload: id,
        });
        
        if (res.data.userType === "Developer") {
          //deleting profile from profile context
          profileDispatch({
            type: "DELETE_PROFILE",
            payload: id,
          });
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    deleteUser(id);
  };

  const handleEdit = (id,user) => {
    // navigate(`/admin-dashboard/update-user/${id}`);
  };

  // filter users
  const filterUsers = (arr) => {
    return arr?.filter((item) => {
      if (query.length === "") {
        return item;
      } else {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          item.userType.toLowerCase().includes(query.toLowerCase())
        );
      }
    });
  };

  return (
    <>
      <section className="users-list">
        <div className="header">
          <h2>User List</h2>
          <div className="search">
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <span>
              <HiSearch color="#000" />
            </span>
          </div>
        </div>

        {users.length !== 0 ? (
          <table className="parent-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers(users).map((user, index) => {
                return (
                  <TableComponent
                    curUser={user}
                    deleteUser={handleDelete}
                    editUser={handleEdit}
                    key={index}
                  />
                );
              })}
            </tbody>
          </table>
        ) : null}
      </section>
    </>
  );
};

export default UserList;
