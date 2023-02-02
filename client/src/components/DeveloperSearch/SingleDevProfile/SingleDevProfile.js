import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { HiOutlineDownload } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { useAuthContext } from "../../../context/AuthContext";
import "./SingleDevProfile.scss";
import axios from "axios";
import AnimatedSpinner from "../../common/AnimatedSpinner/AnimatedSpinner";
import RightSection from "./RightSection/RightSection";
import LeftSection from "./LeftSection/LeftSection";
import { useProfileContext } from "../../../context/ProfileContext";
import { toast } from "react-toastify";

const SingleDevProfile = () => {
  const [deleteMode, setDeleteMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
  const { dispatch, profile } = useProfileContext();
  const { dispatch: profileDispatch } = useProfileContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [downloadActive, setDownloadActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  //getting profile and setting it in context
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/profiles/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        });
        setIsLoading(false);
        dispatch({
          type: "SET_SINGLE_PROFILE",
          payload: res.data,
        });
       
      } catch (error) {
        console.log(error.response.data?.message);
      }
    };
    getProfile();
  }, []);

  const downloadProfile = () => {
    setDownloadActive(true);
    //taking screenshot and than saving it as pdf
    const profileName = profile?.name;
    const pdfName = `${profileName.replace(" ", "_")}.pdf`;
    const profileSection = document.getElementById("profile");
    setIsDownloading(true);
    setTimeout(() => {
      html2canvas(profileSection).then((canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("img/png");
        const pdf = new jspdf();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(pdfName);
      });
    }, 1000);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadActive(false);
    }, 1200);
    navigate(`/dev/profile/${profile._id}`);
  };

  //deleting profile
  const deleteProfile = (id) => {
    //deleting user
    const deleteUser = async () => {
      try {
        const res = await axios.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        
        toast.success(`User  ${res.data.name} deleted`);
        navigate(`/devs-profile`);
        //deleting user from user context
        dispatch({
          type: "DELETE_USER",
          payload: id,
        });
         //deleting profile from profile context
         profileDispatch({
          type: "DELETE_PROFILE",
          payload: id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    deleteUser(id);
  };
  return (
    <>
      <Navbar />
      {isLoading ? (
        <AnimatedSpinner />
      ) : (
        <main className="container dev-profile">
          {isDownloading ? (
            <div className="downloading-spinner">
              <p>Downloading...</p>
              <AnimatedSpinner />
            </div>
          ) : null}
          <header>
            <div className="title">
              <h1>{profile?.name}</h1>
            </div>
            <div className="actions">
              <span
                className="download-icon"
                onClick={() => {
                  downloadProfile();
                }}
              >
                <HiOutlineDownload />
              </span>
              <Link to={`/dev/edit-profile/${id}`}>
                {" "}
                <span className="edit-icon">
                  <FiEdit />
                </span>
              </Link>
              {user?.userType === "Admin" ? (
                <span
                  className="delete-icon"
                  onClick={() => {
                    setDeleteMode("yes");
                  }}
                >
                  <MdOutlineDeleteOutline />
                </span>
              ) : (
                null
              )}

              {deleteMode === "yes" ? (
                <div className="delete-mode">
                  <p>
                    Are you sure you want to delete user{" "}
                    <span>{profile?.name}</span>
                  </p>
                  <button
                    className="delete"
                    onClick={() => {
                      deleteProfile(profile?._id);
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
            </div>
          </header>

          {profile && (
            <section
              id="profile"
              style={{ padding: downloadActive ? "100px" : "0px" }}
            >
              {downloadActive ? (
                <div className="pdf-section">
                  <div>
                    {" "}
                    <h1 className="pdf-title">{profile?.name}</h1>
                    <p>{profile?.email}</p>
                  </div>
                  <hr />
                </div>
              ) : null}
              <div className="info">
                <LeftSection profile={profile} />
                <RightSection profile={profile} />
              </div>
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default SingleDevProfile;
