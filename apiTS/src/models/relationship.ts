import { Schema, model, Document } from "mongoose";
// import User from "./user";

export interface Relationship extends Document {
    followers:Schema.Types.ObjectId[];
    following:Schema.Types.ObjectId[];
}

const Relationshipschema: Schema<Relationship> = new Schema({
    followers:[{type:Schema.Types.ObjectId,ref:"User"}],
    following:[{type:Schema.Types.ObjectId,ref:"User"}],
},{
    timestamps:true
});


const RelationshipModel = model<Relationship>("Relationship", Relationshipschema);

export default RelationshipModel;