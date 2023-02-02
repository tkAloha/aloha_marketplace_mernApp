import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoComponent = ({ videoCategory, defaultImg,heading }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const { title, desc, link } = videoCategory;
  return (
    <section className="video">
      <h3>{heading}</h3>
      <div className="layout">
        <div onClick={toggleModal}>
          <img className="video-image" src={defaultImg} alt="img" />
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <ReactPlayer
                  controls
                  style={{ position: "relative" }}
                  url={link}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                    facebook: {
                      appId: "12345",
                    },
                  }}
                />
                <button className="close-btn" onClick={toggleModal}>
                  X
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="content">
          <h4 className="title">{title}</h4>
          <p className="desc">{desc}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
