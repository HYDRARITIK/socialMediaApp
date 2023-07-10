import React from "react";
import "./comment.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const comments = [
  {
    id: 1,
    desc: "Love For All, Hatred For None.",
    photo:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    userName: "Safak Kocaoglu",
  },
  {
    id: 2,
    desc: "Love For All, Hatred For None.",
    photo:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    userName: "Safak Kocaoglu",
  },
];

const Comment = ({ postId, allComments }) => {
  console.log("postId", postId);

  const { currentUser } = useContext(AuthContext);

  const sendComment = async (newcomment) => {
    const resp = await makeRequest.post(`/comment`, newcomment);
    return resp.data.data;
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["comments"],
    async () => {
      const resp = await makeRequest.get(`/comment?postId=${postId}`);
      setGlobalNames(resp.data.names);
      return resp.data.data;
    }
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendComment,
    onSuccess: (updatedCOmment) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] });

      // queryClient.setQueryData(['comments'], updatedCOmment);
    },
  });

  const [globalNames, setGlobalNames] = useState(null);

  const [desc, setDesc] = useState("");

  const handleCommentSend = async () => {
    const newcomment = {
      userId: currentUser._id,
      desc,
      postId: postId,
    };
    sendComment(newcomment);
    setDesc("");
  };

  return (
    <div className="wrapper">
      <div className="writer">
        <img src={comments[0].photo} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleCommentSend}>send</button>
      </div>

      {isError ? (
        <span>{error}</span>
      ) : isLoading ? (
        "loading..."
      ) : (
        <div className="comments">
          {data?.map((comment, index) => {
            return (
              <div className="comment" key={comment.id}>
                <div className="user">
                  <img src={comments[0].photo} alt="" />
                  <span>{globalNames && globalNames[index]}</span>
                </div>
                <div className="info">
                  <p>{comment.desc}</p>
                </div>
                <span>{moment(comment.createdAt).fromNow()}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
