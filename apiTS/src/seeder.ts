import mongoose from 'mongoose';

import User from './models/user';
import Like from './models/like';
import Post from './models/post';
import Comment from './models/comment';
import Story from './models/story';

import connectDB from './config/db';

import dotenv from 'dotenv';

dotenv.config({  });

const fs = require('fs');


//connect to database
connectDB();
//read json files

const users = JSON.parse(fs.readFileSync(`${__dirname}/../src/_data/user.json`, 'utf-8'));
const likes=JSON.parse(fs.readFileSync(`${__dirname}/_data/like.json`,'utf-8'));
const posts=JSON.parse(fs.readFileSync(`${__dirname}/_data/post.json`,'utf-8'));
const stories=JSON.parse(fs.readFileSync(`${__dirname}/_data/story.json`,'utf-8'));
const comments=JSON.parse(fs.readFileSync(`${__dirname}/_data/comment.json`,'utf-8'));

//import into database
const importData = async () => {

    try {
        await User.create(users);
        await Like.create(likes);
        await Post.create(posts);
        await Story.create(stories);
        await Comment.create(comments);

        console.log('Data imported');
        process.exit();

    } catch (error) {

        console.log(error);


    }

}


//delete data

const deleteData = async () => {

    try {
        await User.deleteMany();
        await Like.deleteMany();
        await Post.deleteMany();
        await Story.deleteMany();
        await Comment.deleteMany();
        console.log('Data deleted');
        process.exit();

    } catch (error) {

        console.log(error);
    }
}




if(process.argv[2]==='import'){
    importData();
}
else if(process.argv[2]==='delete'){
    deleteData();
}













