import mongoose, { Document, Schema ,Types} from "mongoose";

export interface Comment extends Document {
    desc: string;
    postId: Types.ObjectId;
    userId: Types.ObjectId;
}

const CommentSchema: Schema<Comment> = new mongoose.Schema
({
    desc:{
        type:String,
        max:500,
        required:true

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
},{
    timestamps:true
});

const CommentModel = mongoose.model<Comment>("Comment", CommentSchema);

export default CommentModel;






