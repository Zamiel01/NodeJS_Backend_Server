import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
export const generateToken = (userId, email) => {
    try {
        const token = jwt.sign(
            { userId, email },
            JWT_SECRET,
            { expiresIn: '7d' } // Token expires in 7 days
        );
        return token;
    } catch (error) {
        throw new Error(`Token generation failed: ${error.message}`);
    }
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Token verification failed: ${error.message}`);
    }
};

// Refresh token with extended expiry
export const refreshToken = (token) => {
    try {
        const decoded = verifyToken(token);
        return generateToken(decoded.userId, decoded.email);
    } catch (error) {
        throw new Error(`Token refresh failed: ${error.message}`);
    }
};
