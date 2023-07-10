import React, { useEffect } from 'react'
import './profile.scss'

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import EmailIcon from '@mui/icons-material/Email';

import { AuthContext } from "../../context/authContext";
import { useContext ,useState} from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { makeRequest } from "../../axios";

const url="https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"


const Profile = () => {

  //from url i have to get the user id

  const userId = window.location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
const queryClient = useQueryClient();

const { isLoading, isError, data, error, refetch } = useQuery(
  ["profile"],
  async () => {
    const resp = await makeRequest.get(`/user/profile?userId=${userId}`);

    return resp.data.data;
  }
);

const [isfollowed, setIsFollowed] = useState(false);

const mutationFunction = async (newfollow) => {
  isfollowed ? deleteFollow(newfollow) : sendFollow(newfollow);
};

const mutation = useMutation({
  mutationFn: mutationFunction,
  onSuccess: (updatedCOmment) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["profile"] });

    // queryClient.setQueryData(['comments'], updatedCOmment);
  }
});

const sendFollow = async (newfollow) => {
  console.log("uploading follow");
  const resp = await makeRequest.post("/user/follow", newfollow);
  return resp.data.data;
};
const deleteFollow = async (newfollow) => {
  console.log("unfollow");
  const resp = await makeRequest.post(`/user/unfollow`, newfollow );
  return resp.data.data;
};


// const [isIamfollowingThisUser, setIsIamFollowingThisUser] = useState(false);


const handlefollowToggle = () => {
  setIsFollowed((prevIsfollowd) => !prevIsfollowd);
  
  const newfollow = {
   userId:userId,
   followerId:currentUser._id
  };
  mutationFunction(newfollow);
};

useEffect(() => {
  if (data?.followers.includes(currentUser._id)) {
    setIsFollowed(true);
  } else {
    setIsFollowed(false);
  }
}, [data]);

  return (
    <div className="profile">
      <div className="imagecontainer">
        <img src={url} alt="" className='large'/>
        <img src={url} alt="" className='small'/>
      </div>
      <div className="userInfo">
        <div className="left">
          <FacebookIcon />
          <LinkedInIcon />
          <InstagramIcon />
          <PinterestIcon />
          <YouTubeIcon />
        </div>
        <div className="middle">
          <span>{
            data?.name
          }</span>
          <div className="location">
            <div className="item">
              <PersonPinCircleIcon />
              <span>city</span>
            </div>
            <div className="item">
              <PersonPinCircleIcon />
              <span>country</span>
            </div>
          </div>
          {
            currentUser._id===userId?null:<button onClick={handlefollowToggle}>{isfollowed?"unfollow":"follow"}</button>
          }
        </div>
        <div className="right">
          <DensityMediumIcon />
          <TwitterIcon />
        </div>
      </div>
      <div className="Posts">
        <div className="item">
          <EmailIcon />
          <span>{data?.email}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
