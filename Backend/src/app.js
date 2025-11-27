import express from "express";
import { generalLimiter } from "./middlewares/rateLimiter.js";

const app = express(); //creates an express app

app.use(express.json()); //gives our server the ability to parse the json requet it gets

// Apply general rate limiting to all routes
app.use(generalLimiter);

//routes would be added here
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

//declare the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

//example route : http://localhost:5000/api/v1/users/register



export default app; 