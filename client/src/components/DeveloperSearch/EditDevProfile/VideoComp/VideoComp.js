import React from "react";

const VideoComp = ({ name, video, onVideoChangeHandler }) => {
  return (
    <div className="category">
      <h3>{name}</h3>
      <hr />
      <div className="input-field">
        <label htmlFor="about-me-video-title">Video Title</label>
        <input
          className="text-field w-input"
          type="text"
          name="title"
          placeholder="Title"
          value={video.title}
          id="about-me-video-title"
          onChange={onVideoChangeHandler}
        />
      </div>
      <div className="input-field">
        <label htmlFor="about-me-video-desc">Video Description</label>
        <textarea
          type="text"
          placeholder="Description"
          value={video.desc}
          name="desc"
          onChange={onVideoChangeHandler}
          id="about-me-video-desc"
        ></textarea>
      </div>
      <div className="input-field">
        <label htmlFor="about-me-video-link">Video Link</label>
        <input
          type="text"
          placeholder="Link"
          value={video.link}
          name="link"
          id="about-me-video-link"
          onChange={onVideoChangeHandler}
        />
      </div>
    </div>
  );
};

export default VideoComp;
