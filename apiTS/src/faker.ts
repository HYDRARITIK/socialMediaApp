// import faker from 'faker';
const  faker = require('faker');
import fs from 'fs';
import { Types } from 'mongoose';
import dotenv from 'dotenv';

import User from './models/user';
import Post from './models/post';
import Like from './models/like';
import Comment from './models/comment';
import Story from './models/story';
import connectDB from './config/db';

//connect to database
connectDB();


interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

interface Post {
  _id: Types.ObjectId;
  desc: string;
  img: string;
  userId: Types.ObjectId;
}

interface Like  {
  _id: Types.ObjectId;
  desc: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
}

interface Comment {
  _id: Types.ObjectId;
  desc: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
}

interface Story  {
  _id: Types.ObjectId;
  img: string;
  userId: Types.ObjectId;
}

const generateFakeUser = (): User => {
  const _id = new Types.ObjectId();
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const followers: Types.ObjectId[] = [];
  const following: Types.ObjectId[] = [];

  return {
    _id,
    name,
    email,
    password,
    followers,
    following,
  };
};

const generateFakePost = (userIds: Types.ObjectId[]): Post => {
  const _id: Types.ObjectId = new Types.ObjectId();
  const desc = faker.lorem.words(3);
  const img = faker.image.imageUrl();
  const userId = faker.random.arrayElement(userIds);

  return {
    _id,
    desc,
    img,
    userId,
  };
};

const generateFakeLike = (userIds: Types.ObjectId[], postIds: Types.ObjectId[]): Like => {
  const _id: Types.ObjectId = new Types.ObjectId();
  const desc = faker.lorem.words(3);
  const userId = faker.random.arrayElement(userIds);
  const postId = faker.random.arrayElement(postIds);

  return {
    _id,
    desc,
    userId,
    postId,
  };
};
const generateFakeComment = (userIds: Types.ObjectId[], postIds: Types.ObjectId[]): Comment => {
  const _id: Types.ObjectId = new Types.ObjectId();
  const desc = faker.lorem.words(3);
  const userId = faker.random.arrayElement(userIds);
  const postId = faker.random.arrayElement(postIds);

  return {
    _id,
    desc,
    userId,
    postId,
  };
};
const generateFakeStory = (userIds: Types.ObjectId[]): Story => {
  const _id: Types.ObjectId = new Types.ObjectId();
  const img = faker.image.imageUrl();
  const userId = faker.random.arrayElement(userIds);

  return {
    _id,
    img,
    userId,
  };
};

const generateFakeData = (userCount: number, postCount: number
  ,likeCount: number, commentCount: number, storyCount: number
  ): { users: User[]; posts: Post[];
    likes: Like[]; comments: Comment[]; stories: Story[];
   } => {
  const users: User[] = [];
  const posts: Post[] = [];
  const likes: Like[] = [];
  const comments: Comment[] = [];
  const stories: Story[] = [];

  for (let i = 0; i < userCount; i++) {
    const fakeUser = generateFakeUser();
    users.push(fakeUser);
  }

  const userIds = users.map((user) => user._id);

  for (let i = 0; i < postCount; i++) {
    const fakePost = generateFakePost(userIds);
    posts.push(fakePost);
  }

  const postIds = posts.map((post) => post._id);

  for (let i = 0; i < likeCount; i++) {
    const fakeLike = generateFakeLike(userIds, postIds);
    likes.push(fakeLike);
  }

  for (let i = 0; i < commentCount; i++) {
    const fakeComment = generateFakeComment(userIds, postIds);
    comments.push(fakeComment);
  }

  for (let i = 0; i < storyCount; i++) {
    const fakeStory = generateFakeStory(userIds);
    stories.push(fakeStory);
  }

  return {
    users,
    posts,
    likes,
    comments,
    stories,

  };
};

const usersCount = 10; // Specify the desired number of fake users
const postsCount = 5; // Specify the desired number of fake posts
const likesCount = 20; // Specify the desired number of fake likes
const commentsCount = 20; // Specify the desired number of fake comments
const storiesCount = 5; // Specify the desired number of fake stories


const fakeData = generateFakeData(usersCount, postsCount, likesCount, commentsCount, storiesCount)

// const json = JSON.stringify(fakeData, null, 2);

// fs.writeFile('data.json', json, (err) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//   } else {
//     console.log(`Generated ${usersCount} fake user documents and ${postsCount} fake post documents and saved to data.json`);
//   }
// });


//import data to database


const importData = async () => {
  try {
    await User.create(fakeData.users);
    await Post.create(fakeData.posts);
    await Like.create(fakeData.likes);
    await Comment.create(fakeData.comments);
    await Story.create(fakeData.stories);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
}


// Delete data

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Like.deleteMany();
    await Comment.deleteMany();
    await Story.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
}


if (process.argv[2] === '-i') {
  importData();
}
else if (process.argv[2] === '-d') {
  deleteData();
}
