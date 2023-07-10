import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


import morgan from 'morgan';
import file_upload from 'express-fileupload';
import cookie_parser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';

const app = express();


// Middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();

})
app.use(express.json());
app.use(cookie_parser());


// Enable file uploads
app.use(fileUpload());



// Handle file upload endpoint
app.post('/upload', (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }
  
    // The name attribute of the file input field in your form should be "file"
    const uploadedFile = req.files.file as UploadedFile;
  
    // Specify the path to save the file
    const uploadPath = path.join(__dirname, 'uploads', 'images', uploadedFile.name);

    //for accessing the file from the client side
    // const uploadPath = path.join(__dirname, 'uploads', 'images', uploadedFile.name);
  
    // Move the file to the specified path
    uploadedFile.mv(uploadPath, (error: Error) => {
      if (error) {
        console.error('Error saving file:', error);
        return res.status(500).json({ message: 'Failed to save file.' });
      }

     // Generate the URL for the uploaded file
     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/images/${uploadedFile.name}`;

     return res.status(200).json({ message: 'File uploaded successfully.', fileUrl });
    });
  });

// Dev logging middleware

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Enable CORS
app.use(cors({
    origin: 'http://127.0.0.1:5173',
}));

//set static folder
app.use(express.static(path.join(__dirname, 'uploads')));


//importing routes
import auth from './routes/auth';
import user from './routes/user';
import post from './routes/post';
import comment from './routes/comment';
import like from './routes/like';
import story from './routes/story';



// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/post', post);
app.use('/api/v1/comment', comment);
app.use('/api/v1/like', like);
app.use('/api/v1/story', story);


//database connection

import connectDB from './config/db';
connectDB();


const port=process.env.PORT || 8800;
const server =app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
    //prit __dirname
// console.log(__dirname);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any, promise:Promise<any>) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
}
);
