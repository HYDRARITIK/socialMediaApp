import React from "react";
import "./singlePost.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { makeRequest } from "../../axios";

import Comment from "../Comment/Comment";
import Share from "../Share/Share";

const SinglePost = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const toggleCommentOpen = () => {
    if (shareOpen) toggleShareOpen();
    console.log("toggleCommentOpen");
    setCommentOpen((prevMode) => !prevMode);
  };

  const toggleShareOpen = () => {
    console.log("toggleShareOpen");
    if (commentOpen) toggleCommentOpen();
    setShareOpen((prevMode) => !prevMode);
  };
  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    console.log("uploading like");
    const newLike = {
      userId: currentUser._id,
      postId: post._id,
    };
    mutationFunction(newLike);
  };

  const mutationFunction = async (newLike) => {
    isLiked ? deleteLike(newLike) : sendLike(newLike);
  };

  //////////////////////////////

  // const [color, setColor] = useState("white");

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["likes"],
    async () => {
      const resp = await makeRequest.get("/like?postId=" + post._id);

      return resp.data.data;
    }
  );

  const sendLike = async (newLike) => {
    const resp = await makeRequest.post("/like", newLike);
    return resp.data.data;
  };
  const deleteLike = async (newLike) => {
    const resp = await makeRequest.delete(`/like`, { data: newLike });
    return resp.data.data;
  };

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  //   const { isError, data,isLoading } = useQuery({
  //     queryKey: ["posts"],
  //     queryFn: getposts,
  //   });

  // Mutations
  const mutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      
    },
  });

  

  //////////////////////////////
  //fetch user in post.userId

  const { isLoading: isLoadingUser, data: dataUser } = useQuery(
    ["user", post.userId],
    async () => {
      const resp = await makeRequest.get(`/user/profile?userId=${post.userId}`);
      return resp.data.data.name;
    }  
  );

  //////////////////////////////
  //fetch comments in post._id

  const { isLoading: isLoadingUser2, data: commentData } = useQuery(
    ["comments"],
    async () => {
      const resp = await makeRequest.get(`/comment?postId=${post._id}`);
      return resp.data.data;
    }
  ) 

  return (
    <div className="post" key={post._id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.img} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{dataUser}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <DensityMediumIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {!isLiked ? (
              <FavoriteBorderIcon onClick={handleLikeToggle} />
            ) : (
              <FavoriteIcon onClick={handleLikeToggle} />
            )}
            {data?.length} Likes
          </div>
          <div className="item">
            <CommentIcon onClick={toggleCommentOpen} />
            {commentData?.length} Comments
          </div>
          <div className="item">
            <ShareIcon onClick={toggleShareOpen} />
            Share
          </div>
        </div>
        <div className="commentContainer">
          {commentOpen && <Comment id={post._id} postId={post._id} 
            userId={post.userId}
            allComments={commentData}
          />}
          {shareOpen && <Share id={post.id} />}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
