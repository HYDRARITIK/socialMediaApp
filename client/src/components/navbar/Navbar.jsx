import React from "react";
import "./navbar.scss";
//import icons drom material ui

// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//import profile image
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeIcon from '@mui/icons-material/LightMode';

import PersonPinIcon from '@mui/icons-material/PersonPin';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DarkModeContext } from "../../context/darkModeContext";

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const darkMode = true;
  // const currentUser={
  //   id:1,
  //   profilePic:"https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //   name:"Godwin"
  // }
  const { isDarkMode ,toggleDarkMode } = React.useContext(DarkModeContext);

  const toggle=()=>{
    console.log("toggle")
    toggleDarkMode();
  }

  const navigate=useNavigate();

  const {currentUser}=useContext(AuthContext);

  const handleNavigate=()=>{
    console.log("handleNavigate")
    navigate(`/profile`);
    
  }


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>HydraGod</span>
        </Link>
        <HomeIcon />
        {isDarkMode ? (
          <LightModeIcon onClick={toggle} />
        ) : (
          <DarkModeIcon onClick={toggle} />
        )}
        <GridViewIcon />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonPinIcon onClick={handleNavigate}/>
        <EmailIcon />
        <NotificationsIcon />
        <div className="user">
          <img
            src={currentUser?.profilePic}
            alt=""
          />
          <span>{currentUser?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
