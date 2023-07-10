import asyncHandler from "../middlewares/async";

import { Request,Response,NextFunction } from "express";
import User from "../models/user";
import Post from "../models/post";
import Relationship from "../models/relationship";

//@desc     getPosts
//@route    Get /api/v1/Posts
//@access  Protected

const posts = [
  {
    id: 1,
    desc: "Love For All, Hatred For None.",
    photo:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
    name: "John Doe",
  },
  {
    id: 2,
    desc: "Love For All, Hatred For None.",
    photo:
      "https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
    name: "John Doe",
  },
];

const getPosts =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
   

  try {
    const allPosts = await Post.find();
    res.status(200).json({ success: true, data: allPosts });
    
  } catch (error) {
    res.status(400).json({ success: false, msg: "Post not found" });
    
  }


  //fetch post of user and to those who he follows
});


//@desc     Add Post
//@route    POST /api/v1/Posts
//@access   Protected


const addPost =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
  // const { desc, img, userId } = req.body;
  try {
    await Post.create(req.body);
    res.status(201).json({ success: true, msg: "Post created" });
    
  } catch (error) {
    res.status(400).json({ success: false, msg: "Post not created" });
    
  }
});




//@desc    delete Post
//@route    DELETE /api/v1/Posts/:id
//@access   Protected



const deletePost =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

});

export {getPosts,addPost,deletePost}