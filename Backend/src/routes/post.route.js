import {Router} from 'express';
import {createPost,getPosts, getPostById, updatePostById, deletePostById} from '../controllers/post.controller.js';

const postRouter = Router(); //creates route instance for post-related endpoints
postRouter.post('/create', createPost); //route to create a new post
postRouter.get('/', getPosts); //route to get all posts
postRouter.get('/:id', getPostById);        
postRouter.put('/:id', updatePostById); //route to update a post by ID
postRouter.delete('/:id', deletePostById); //route to delete a post by ID

export default postRouter;