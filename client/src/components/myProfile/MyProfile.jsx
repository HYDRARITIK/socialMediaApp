// Profile.js

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './myProfile.scss';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [userPic, setUserPic] = useState(currentUser?.userPic);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPicChange = (e) => {
    setUserPic(e.target.value);
  };

  const handleProfileUpdate = () => {
    // updateProfile({ name, email, userPic });
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-picture" src={userPic} alt="Profile" />
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{email}</p>
          <div className="profile-stats">
            <span className="followers">Followers: {currentUser.followers.length}</span>
            <span className="following">Following: {currentUser.following.length}</span>
          </div>
        </div>
      </div>
      <div className="profile-controls">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="userpic">User Picture URL:</label>
        <input
          type="text"
          id="userpic"
          value={userPic}
          onChange={handleUserPicChange}
        />
        <button onClick={handleProfileUpdate}>Update Profile</button>
      </div>
    </div>
  );
};

export default Profile;
