import { Link } from "react-router-dom";
import "./ProfileSection.scss";

const Profile = ({ profile }) => {
  return (
    <Link to={`/dev/profile/${profile._id}`}>
    <article className="profile-section" key={profile._id}>
      <div className="flex even-element ">
        <div className="image-grid">
          <p className="photo-name">PHOTO</p>
          <div className="dot-line4"></div>
            <div>
              <img className="image" src={`/uploads/${profile.image}`} alt="" />
            </div>
          <p className="availability-text">AVAILABILITY</p>
          <div className="dot-line5"></div>
          <div className="availability">{profile.availability}</div>
          <div className="down-line"></div>
        </div>
        <div className="new-grid">
          <p className="grid-text1">Name</p>
          <div className="dot-line1"></div>
          <div className="name">{profile.name}</div>
          <p className="grid-text2">Proficiency</p>
          <div className="dot-line2"></div>
          <div className="proficiency">{profile.proficiency} %</div>
          <p className="grid-text3">SKILLS</p>
          <div className="dot-line3"></div>
          <div className="skills">
          <p>{profile?.skills?.slice(0,-2)}</p>
          </div>
        </div>
        <div className="card-group-content-divider"></div>
      </div>
    </article>
    </Link>
  );
};

export default Profile;
