import mongoose, { Document, Schema,Types } from 'mongoose';


export interface User extends Document {
  name: string;
  email: string;
  password: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];

}

const userSchema: Schema<User> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  following: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
},{
    timestamps:true
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
