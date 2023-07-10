import asyncHandler from "../middlewares/async";

import { Request, Response, NextFunction } from "express";
import User from "../models/user";

import { Types } from "mongoose";

//@desc     getUser
//@route    Get /api/v1/user/find/:id
//@access  Protected

const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Types.ObjectId(req.query.userId.toString());
    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    res.status(200).json({ success: true, data: user });
  }
);

//@desc    update user
//@route    PUT /api/v1/user
//@access   Protected

const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

const followUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    var { userId, followerId } = req.body;

    // in user model we have followers array and following array
    // so we need to push the followerId in the followers array of the userId
    // and push the userId in the following array of the followerId

    var user1 = await User.findOne({ _id: userId });
    var user2 = await User.findOne({ _id: followerId });

    user1.followers.push(followerId);
    user2.following.push(userId);

    await user1.save();
    await user2.save();

    res.status(200).json({ success: true, data: user1 });
  }
);

const unfollowUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Types.ObjectId(req.body.userId.toString());
        const followerId = Types.ObjectId(req.body.followerId.toString());
    
        var user1 = await User.findOne({ _id: userId });
        var user2 = await User.findOne({ _id: followerId });
    
        // remove the followerId from the followers array of the userId
        // and remove the userId from the following array of the followerId
    
        user1.followers = user1?.followers.filter(
          (id: Types.ObjectId) => !id.equals(followerId)
        );
        user2.following = user2?.following.filter(
          (id: Types.ObjectId) => !id.equals(userId)
        );
    
        await user1.save();
        await user2.save();
    
        user1 = await User.findOne({ _id: userId });
        user2 = await User.findOne({ _id: followerId });
    
        res.status(200).json({ success: true, data: { user1, user2 } });
      } catch (error) {
        next(error);
      }
  }
);

export { getUser, updateUser, followUser, unfollowUser };
