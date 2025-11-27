import {Router} from 'express';
import {createPost,getPosts, getPostById, updatePostById, deletePostById} from '../controllers/post.controller.js';
import { authenticateToken } from '../middlewares/auth.js';
import { createPostLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validator.js';
import { createPostSchema, updatePostSchema } from '../validators/schemas.js';

const postRouter = Router(); //creates route instance for post-related endpoints
postRouter.post('/create', authenticateToken, createPostLimiter, validate(createPostSchema), createPost); //route to create a new post with auth, rate limiting, and validation
postRouter.get('/', getPosts); //route to get all posts (public)
postRouter.get('/:id', getPostById); //route to get a post by ID (public)
postRouter.put('/:id', authenticateToken, validate(updatePostSchema), updatePostById); //route to update a post by ID (requires auth and validation)
postRouter.delete('/:id', authenticateToken, deletePostById); //route to delete a post by ID (requires auth)

export default postRouter;