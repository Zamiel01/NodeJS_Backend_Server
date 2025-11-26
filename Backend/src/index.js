import dotenv from "dotenv";//helps us use our environment vairable in all our server
dotenv.config({
    path: "./.env"
});//loads the environment variables from the .env file into process.env

import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        //connect to database
        await connectDB();  
       app.on("error", (error) => {
           console.error("Error starting server:", error);
       });
       app.listen(PORT, () => {
           console.log(`Server is running on port ${PORT}`);//the port variable is gotten from the .env file
       }
    );
    }catch (error) {
        console.error("Failed to start server due to database connection error:", error);
        process.exit(1); //exit with failure
    }
}

startServer();