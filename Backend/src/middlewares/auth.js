import { verifyToken } from '../utils/jwt.js';

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                message: 'Access token required. Use Authorization: Bearer <token>'
            });
        }

        // Verify the token
        const decoded = verifyToken(token);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = verifyToken(token);
            req.user = decoded;
        }
        next();
    } catch (error) {
        // Continue without user context
        next();
    }
};
