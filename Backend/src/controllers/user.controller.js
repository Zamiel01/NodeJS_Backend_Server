import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        //check if user already exists
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if (existingUser) {
            return res.status(409).json({message: 'User already exists'});
        }
        // Hash the password before saving

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, email, password: hashedPassword, loggedIn: false});
        await newUser.save();
        
        // Generate JWT token
        const token = generateToken(newUser._id, newUser.email);
        
        res.status(201).json({message: 'User created successfully',  user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token //return JWT token for immediate authentication
        });

    } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
    }
};

//login user controller function can be added here
const loginUser = async (req, res) => {
   try {
       const {email, password} = req.body;      
         //basic validation
         if (!email || !password) {
                return res.status(400).json({message: 'All fields are required'});
            }
         //check if user exists
            const user = await User.findOne({email: email.toLowerCase()});
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            //compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);  
            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials'});
            }
            
            // Generate JWT token
            const token = generateToken(user._id, user.email);
            
            res.status(200).json({message: 'Login successful', user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token // return JWT token for authentication
            });
   } catch (error) {
        res.status(500).json({message: 'internal Server error', error: error.message});
   }
}

//logout user controller function can be added here
const logoutUser = async (req, res) => {
    // Implementation for logging out a user    
  const {email} = req.body;
  try {
    const user = await User.findOne({email: email.toLowerCase()});
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    // Here you can implement token invalidation logic if using JWT or sessions
    res.status(200).json({message: 'Logout successful'});
  } catch (error) {
    res.status(500).json({message: 'internal Server error', error: error.message});
  }

}
export {
    createUser,
    loginUser,
    logoutUser
}