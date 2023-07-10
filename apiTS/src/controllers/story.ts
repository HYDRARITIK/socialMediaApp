import asyncHandler from "../middlewares/async";

import { Request,Response,NextFunction } from "express";

import Story from "../models/story";

//@desc     getStorys
//@route    Get /api/v1/Storys
//@access  Protected

const getStories =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

        const allStories = await Story.find();
        res.status(200).json({ success: true, data: allStories });


});


//@desc     Add Story
//@route    Story /api/v1/Storys
//@access   Protected


const addStory =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

        const NewStory=await Story.create(req.body);
        res.status(200).json({ success: true, data: NewStory});
});




//@desc    delete Story
//@route    DELETE /api/v1/Storys/:id
//@access   Protected



const deleteStory =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {
    const id=req.params.id;
});


export {getStories,addStory,deleteStory}