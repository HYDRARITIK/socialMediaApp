import React from "react";
import "./stories.scss";
import AddIcon from "@mui/icons-material/Add";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { makeRequest } from "../../axios";
//dummy data

import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const stories = [
  {
    id: 1,
    name: "Godwin",
    profilePic:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 2,
    name: "Godwin",
    profilePic:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 3,
    name: "Godwin",
    profilePic:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const Stories = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["stories"],
    async () => {
      const resp = await makeRequest.get("/story");

      return resp.data.data;
    }
  );
  const { currentUser } = useContext(AuthContext);

  const sendStory = async (newTodo) => {
    const resp = await makeRequest.post("/story", newTodo);
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
    mutationFn: sendStory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  const uploadStory = () => {
    console.log("uploading story");
    sendStory({
      userId:currentUser._id,
    })
  };



  return (

    
    
    <div className="container">
    <div className="stories">
        <div className="story">
          <img src={stories[0].profilePic} alt="" />
          <div className="span">
            <AddIcon onClick={uploadStory} className="icon"/>
            <span>{stories[0].name}</span>
          </div>
        </div>

        {isError ? (
          "something went wrong"
        ) : isLoading ? (
          "loading..."
        ) : (
          <>
          {data?.map((story) => {
              return (
                <div className="story" key={story._id}>
                  <img src={story.img} alt="" />
                  <span style={
                    {
                      color:"white",
                    }
                  }>{story.userId}</span>
                </div>
              );
            })}
          </>
        )}

        
      </div>
    </div>
      
    
  );
};

export default Stories;
