import mongoose from 'mongoose';
const mongo_url=process.env.MONGO_URI || 'mongodb://localhost:27017/hydrasocial';

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(mongo_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            autoIndex:false
        });
        console.log(`MongoDB connected:${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error:${error.message}`);
    }

    mongoose.connection.on('error',err=>{
        console.error(`Error:${err.message}`); //listen for error
    });

    mongoose.connection.on('disconnected',()=>{
        console.log("MongoDB disconnected"); //listen for disconnected
    }) //listen for disconnected
}


export default connectDB;