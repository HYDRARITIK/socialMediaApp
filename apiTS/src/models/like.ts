import mongoose, { Document, Schema ,Types} from "mongoose";

export interface Like extends Document {
    desc: string;
    postId: Types.ObjectId;
    userId: Types.ObjectId;
}

const LikeSchema: Schema<Like> = new mongoose.Schema(
  {
    desc:{
        type:String,
        default:"liked"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = mongoose.model<Like>("Like", LikeSchema);

export default LikeModel;
