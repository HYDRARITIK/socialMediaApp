import mongoose, { Document, Schema ,Types} from 'mongoose';

export interface Post extends Document {
    desc: string;
    img: string;
    userId: Types.ObjectId;
}

const PostSchema: Schema<Post> = new mongoose.Schema({
    desc:{
        type:String,
        max:500,
    },
    img:{
        type:String,
        default:"https://images.pexels.com/photos/415828/pexels-photo-415828.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    
    }
},{
    timestamps:true
});

const PostModel = mongoose.model<Post>('Post', PostSchema);

export default PostModel;


