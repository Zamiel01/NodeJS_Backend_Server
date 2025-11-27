import {Post} from '../models/post.model.js';
// Controller function to create a new post
export const createPost = async (req, res) => {
    try { 
        const {name, description, age} = req.body;
        //basic validation
        if (!name || !description || !age) {    
            return res.status(400).json({message: 'All fields are required'});
        }
        const newPost = new Post({name, description, age});
        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post: newPost});
    } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};

// Controller function to get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}); //fetch all posts sorted by creation date in descending order
        res.status(200).json({posts});
    } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};
// Controller function to get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({post});
    }
    catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};
// Controller function to update a post by ID
export const updatePostById = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, age} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, {name, description, age}, {new: true});
        if (!updatedPost) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post updated successfully', post: updatedPost});
    } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};
// Controller function to delete a post by ID
export const deletePostById = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};

export default {
    createPost,
     getPosts, 
     getPostById,
     updatePostById, 
     deletePostById
};