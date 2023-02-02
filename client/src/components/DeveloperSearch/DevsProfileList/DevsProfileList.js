import React, { useEffect, useLayoutEffect, useState } from "react";
import "./DevsProfileList.scss";
import { HiSearch } from "react-icons/hi";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";
import axios from "axios";
import ProfileSection from "./ProfileSection/ProfileSection";
import { useAuthContext } from "../../../context/AuthContext";
import { useProfileContext } from "../../../context/ProfileContext";
import Navbar from "../../Navbar/Navbar";

const DevsProfileList = () => {
  const { user } = useAuthContext();
  const { dispatch, profiles } = useProfileContext();
  const [query, setQuery] = useState("");
  const [avgExperience, setAvgExperience] = useState(0);
  const [sortedProfiles, setSortedProfiles] = useState([]);
  const [profilesOrder, setProfilesOrder] = useState("a-z");

  // filter users
  const filterUsers = (arr) => {
    let newArr =arr?.map((item)=>{
     return {...item, skills:item?.skills?.reduce((acc, curVal)=>{
       return acc+=`${curVal.name}, `
     },[""])
    }
    })
    
    if (newArr?.length > 0) {
      return newArr?.filter((item) => {
        if (query.length === "") {
          return item;
        } else {
          return (
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.availability.toLowerCase().includes(query.toLowerCase()) ||
            item.proficiency.toString().includes(query) ||
            item.skills.toLowerCase().includes((query.toLowerCase()))
          )
        }
      });
    }
  };

  

  useEffect(() => {
    //calculating total experince
    const total = profiles?.reduce((total, profile) => {
      total = total + profile.totalExp;
      return total;
    }, 0);
    setAvgExperience(Math.round(total / profiles?.length));
  }, []);

  //fetching profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("/profiles", {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        });

        //saving it to profile context
        dispatch({
          type: "SET_PROFILES",
          payload: res.data,
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchProfiles();
  }, [dispatch,profiles]);

  return (
    <>
      <Navbar />
      <main className="container">
        <header className="profile-header">
          <h2 className="title">Profiles</h2>
          <div className="filter-section">
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
            <div className="sort">
              {profilesOrder === "a-z" ? (
                <span
                  className="sort-icon"
                  onClick={() => {
                    const sortedPro = [...profiles].sort((a, b) =>
                      b.name.localeCompare(a.name)
                    );
                    setSortedProfiles(sortedPro);
                    setProfilesOrder("z-a");
                  }}
                >
                  <FcAlphabeticalSortingAz />
                </span>
              ) : null}
              {profilesOrder === "z-a" ? (
                <span
                  className="sort-icon"
                  onClick={() => {
                    const sortedPro = [...profiles].sort((a, b) =>
                      a.name.localeCompare(b.name)
                    );
                    setSortedProfiles(sortedPro);
                    setProfilesOrder("a-z");
                  }}
                >
                  <FcAlphabeticalSortingZa />
                </span>
              ) : null}
            </div>
          </div>
        </header>
        <section className="status">
          <h3 className="title">AVAILABLE</h3>
          <div className="available">
            <p className="num">{profiles?.length}</p>
            <p className="text">Developers Available</p>
          </div>
          <div className="avg-experience">
            {avgExperience ?<p className="num">{avgExperience}</p>:<p className="num">0</p>}
            <p className="text">Average Experience</p>
          </div>
        </section>
        <section className="profiles-grid">
          {sortedProfiles?.length > 0
            ? filterUsers(sortedProfiles).map((profile, index) => {
                return <ProfileSection profile={profile} key={index} />;
              })
            : filterUsers(profiles)?.map((profile, index) => {
                return <ProfileSection profile={profile} key={index} />;
              })}
        </section>
      </main>
    </>
  );
};

export default DevsProfileList;
