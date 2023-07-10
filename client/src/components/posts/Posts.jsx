import React from "react";
import "./posts.scss";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

import SinglePost from "../SinglePost/SinglePost";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import AddPost from "../AddPost/AddPost";


const Posts = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["posts"],
    async () => {
      const resp = await makeRequest.get("/post");

      return resp.data.data;
    }
  );

  const toggleCommentOpen = (id) => {
    console.log("toggleCommentOpen");
    setCommentOpen((prevMode) => !prevMode);
  };

  return (
    <>
    <AddPost/>
      {isError ? (
        "something went wrong"
      ) : isLoading ? (
        "loading..."
      ) : (
        <div className="posts">
          {data?.map((post,index) => {
            return <SinglePost post={post} id={index} />;
          })}
        </div>
      )}
    </>
  );
};

export default Posts;
