import {Router} from 'express';
import {createUser, loginUser, logoutUser} from '../controllers/user.controller.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validator.js';
import { registerSchema, loginSchema } from '../validators/schemas.js';
import { authenticateToken } from '../middlewares/auth.js';

const userRouter = Router(); //creates route instance for user-related endpoints 
userRouter.post('/register', authLimiter, validate(registerSchema), createUser); //route to create a new user with rate limiting and validation
userRouter.post('/login', authLimiter, validate(loginSchema), loginUser); //route to login a user with rate limiting and validation
userRouter.post('/logout', authenticateToken, logoutUser); //route to logout a user (requires authentication)

export default userRouter;