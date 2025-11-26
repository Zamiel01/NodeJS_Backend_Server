//we shall configure the dabase
 
import mongoose from "mongoose"; //talks to our database
import { DB_NAME } from "./constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log("Database connected successfully:", connectionInstance.connection.host);
    }catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); //exit with failure
    }
}

export default connectDB;

