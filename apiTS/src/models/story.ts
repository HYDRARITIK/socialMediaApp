import mongoose, { Document, Schema ,Types} from "mongoose";


export interface Story extends Document {
  img: string;
  userId: Types.ObjectId;
}

const storySchema: Schema<Story> = new mongoose.Schema({
  img: {
    type: String,
    default:"https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const StoryModel = mongoose.model<Story>("Story", storySchema);

export default StoryModel;
