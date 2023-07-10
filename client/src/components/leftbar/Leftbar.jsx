import React from "react";
import "./leftbar.scss";
//import images from "../../assets/images";

import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";
import img6 from "../../assets/6.png";
import img7 from "../../assets/7.png";
import img8 from "../../assets/8.png";
import img9 from "../../assets/9.png";
import img10 from "../../assets/10.png";
import img11 from "../../assets/11.png";
import img12 from "../../assets/12.png";
import img13 from "../../assets/13.png";








const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
        <div className="item">
          <img src={img1} alt="" />
          <span>user name</span>
        </div>
          <div className="item">
            <img src={img2} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={img2} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={img3} alt="" />
            <span>MarketPlace</span>
          </div>
          <div className="item">
            <img src={img4} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={img5} alt="" />
            <span>Memories</span>
          </div>
        </div>
<hr />

        <div className="menu">
          <span>shortcut</span>
          <div className="item">
            <img src={img6} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={img7} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={img8} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={img9} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={img10} alt="" />
            <span>Messages</span>
          </div>
        </div>
<hr />
        <div className="menu">
        <span>Others</span>
        <div className="item">
            <img src={img11} alt="" />
            <span>Fund</span>
          </div>
          <div className="item">
            <img src={img12} alt="" />
            <span>Tutorial</span>
          </div>
          <div className="item">
            <img src={img13} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
