import mongoose from "mongoose";

async function connectToMongo() {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error("Please provide MONGO_URI in the .env file");
        return;
    }
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectToMongo;