import asyncHandler from "../middlewares/async";

import { Request, Response, NextFunction, query } from "express";
import Like from "../models/like";
import { Types } from 'mongoose';

const stringId = '60d77d5ab558405a8452e7e9';
const objectId = Types.ObjectId(stringId);


//@desc     getLikes
//@route    Get /api/v1/Likes
//@access   Public

const getLikes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = Types.ObjectId(req.query.postId.toString());
    const allLikes = await Like.find({ postId: postId});
    res.status(200).json({ success: true, data: allLikes });
  }
);

//@desc     Add Like
//@route    POST /api/v1/Likes
//@access   Public

const addLike = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newLike = await Like.create(req.body);
    res.status(201).json({ success: true, data: newLike });
  }
);

//@desc    delete Like
//@route    DELETE /api/v1/Likes/
//@access   Public

const deleteLike = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, userId } = req.body;

    const result = await Like.deleteOne({
      postId: postId,
      userId: userId,
    });

    res.status(200).json({ success: true, data: {} });
  }
);

export { getLikes, addLike, deleteLike };
