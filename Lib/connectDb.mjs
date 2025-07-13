import mongoose from "mongoose";
const url = "mongodb://localhost:27017/blog-posts"

const connectDb=async()=>{
    try{
        await mongoose.connect(url);
        console.log("Database connected successfully")
    }
    catch(err) {
        console.log("Error connecting to database",err)
    }
}
const disconnectDb=async()=>{
    try{
        await mongoose.disconnect(url);
        console.log("Database disconnected successfully")
    }
    catch(err) {
        console.log("Error in disconnecting database",err)
    }
}
export {connectDb,disconnectDb}