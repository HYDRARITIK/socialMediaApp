import asyncHandler from "../middlewares/async";

import { Request,Response,NextFunction } from "express";

//@desc     getRelationships
//@route    Get /api/v1/Relationships
//@access  Protected

const getRelationships =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

});


//@desc     Add Relationship
//@route    Relationship /api/v1/Relationships
//@access   Protected


const addRelationship =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

});




//@desc    delete Relationship
//@route    DELETE /api/v1/Relationships/
//@access   Protected



const deleteRelationship =asyncHandler(async(req:Request, res:Response,next:NextFunction) => {

});


export {getRelationships,addRelationship,deleteRelationship}