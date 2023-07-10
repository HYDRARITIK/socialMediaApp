import asyncHandler from "../middlewares/async";

import { Request,Response,NextFunction } from "express";
import { Types } from 'mongoose';
import Comment from "../models/comment";
import User from "../models/user";

//@desc     getComments
//@route    Get /api/v1/comments
//@access   Public

const getComments =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
    const postId=Types.ObjectId(req.query.postId.toString());

    const  allComments=await Comment.find({postId:postId});

    //after getting all comments we need to get the user name of each comment and add in response
    //so we will loop through all comments and get the user name of each comment
    //and add it to the response
    var allNames:string[]=[];
    for(let i=0;i<allComments.length;i++){
        const comment=allComments[i];
        const userId=comment.userId;
        const user=await User.findById(userId);
        allNames.push(user?.name);
    }
    res.status(200).json({success:true,data:allComments,names:allNames});
  
});


//@desc     Add comment
//@route    POST /api/v1/comments
//@access   Public


const addComment =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
    const newComment=await Comment.create(req.body);
    res.status(201).json({success:true,data:newComment});
});




//@desc    delete comment
//@route    DELETE /api/v1/comments/:id
//@access   Public



const deleteComment =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
    const commentId=Types.ObjectId(req.params.id.toString());
    const result=await Comment.deleteOne({_id:commentId});
    res.status(200).json({success:true,data:{}});
});



export {getComments,addComment,deleteComment};