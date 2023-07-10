import React from "react";
import "./addPost.scss";
const image =
  "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
import ImageIcon from "@mui/icons-material/Image";
import PlaceIcon from "@mui/icons-material/Place";
import TagIcon from "@mui/icons-material/Tag";
import { useState } from "react";

import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSpanClick = () => {
    document.getElementById("fileInput").click();
  };
  const SendPost = async (newTodo) => {
    const resp = await makeRequest.post("/post", newTodo);
    return resp.data.data;
  };

  const handleUpload = async () => {
    //upload file and get url
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }
      const data = new FormData();
      const fileName = Date.now() + selectedFile.name;
      data.append("name", fileName);
      data.append("file", selectedFile);
      const resp = await axios.post("http://localhost:8800/upload", data);
      const newPost = {
        userId: currentUser._id,
        desc,
        img: resp.data.fileUrl,
      };

      setDesc("");
      setSelectedFile(null);

      SendPost(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  // Access the client

  // Mutations
  const mutation = useMutation({
    mutationFn: SendPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="post">
      <div className="top">
        <img src={image} alt="" />
        <input
          type="text"
          placeholder="What's on your mind?"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleUpload}>UPLOAD</button>
      </div>
      <div className="separator" />
      <div className="bottom">
        <div className="item">
          <ImageIcon />
          <span className="addImage" onClick={handleSpanClick}>
            addImage
          </span>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="item">
          <PlaceIcon />
          <span>add place </span>
        </div>
        <div className="item">
          <TagIcon />
          <span>Tag</span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
