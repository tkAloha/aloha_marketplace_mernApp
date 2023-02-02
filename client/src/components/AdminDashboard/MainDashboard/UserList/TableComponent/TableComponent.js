import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAuthContext } from "../../../../../context/AuthContext";
import EditUser from "../../EditUser/EditUser";

function TableComponent({ curUser, deleteUser, editUser }) {
  const [deleteMode, setDeleteMode] = useState("");
  const [editMode, setEditMode] = useState("");

  const {_id,name,email,userType} = curUser
  const cancelEdit =()=>{
    setEditMode("")
  }
  const { user } = useAuthContext();

  const handleEdit = () =>{
    setEditMode("")
  }
 
  return (
    <>
      {editMode === "yes" ? (
        <EditUser curUser={curUser} cancelEdit ={cancelEdit}  handleEdit={handleEdit}/>
      ) : (
        <tr key={_id}>
          <td className="capitalize">{name}</td>
          <td>{email}</td>
          <td>{userType}</td>

          {curUser.name !== "Super Administrator" && curUser.name !== "Tasnim k"? <td className="actions">
            <button
              className="edit-btn"
              onClick={() => {
                editUser(_id);
                setEditMode("yes");
              }}
            >
              <FiEdit />
            </button>
            {user.id !== curUser._id ?  <button
              onClick={() => {
                setDeleteMode("yes");
              }}
              className="delete-btn"
            >
              <MdOutlineDeleteOutline />
            </button>:null} 
           
            {deleteMode === "yes" ? (
              <div className="delete-mode">
                <p>Are you sure you want to delete user <span>{name}</span></p>
                <button
                  className="delete"
                  onClick={() => {
                    deleteUser(_id);
                    setDeleteMode("");
                  }}
                >
                  Yes, delete
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setDeleteMode("");
                  }}
                >
                  cancel
                </button>
              </div>
            ) : null}
          </td>:<td className="not-enabled">Not enabled</td>}
          
        </tr>
      )}
    </>
  );
}

export default TableComponent;
