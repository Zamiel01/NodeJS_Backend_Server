# Backend Server API

A production-ready Node.js REST API backend built with Express.js, MongoDB, and enterprise-level security features. This server provides user authentication with JWT tokens, posts management, password encryption with bcrypt, and comprehensive request validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Validation](#validation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Security Considerations](#security-considerations)
- [Error Handling](#error-handling)
- [License](#license)

## Features

### 🔐 Security
- **JWT Authentication**: Secure token-based authentication with 7-day expiration
- **Password Encryption**: bcryptjs with salt rounds for secure password hashing
- **Rate Limiting**: Configurable rate limits to prevent API abuse
  - General: 100 requests per 15 minutes
  - Auth endpoints: 5 requests per 15 minutes
  - Post creation: 10 requests per minute
- **Input Validation**: JSON schema validation using Joi for all request bodies
- **CORS Ready**: Express JSON middleware configured

### 📝 User Management
- User registration with email validation
- Secure login with password verification
- JWT token generation on registration and login
- User logout functionality
- Password hashing with bcryptjs

### 📰 Posts Management
- Create, read, update, and delete posts
- Public read access
- Authenticated write access
- Timestamp tracking (createdAt, updatedAt)
- User-friendly error messages

### 🚀 Developer Experience
- Nodemon for hot-reload development
- Comprehensive error handling
- Detailed validation error messages
- MongoDB integration with Mongoose
- Environment variable configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v9.0.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs v3.0.3
- **Validation**: Joi (JSON schema validation)
- **Rate Limiting**: express-rate-limit
- **Development**: Nodemon v3.1.11
- **Environment**: dotenv v17.2.3

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB connection string
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Setup](#environment-setup))

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:5000`

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# Server
PORT=5000

# JWT Security
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
```

### Environment Variables Description

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | - | ✅ Yes |
| `PORT` | Server port | 5000 | ❌ No |
| `JWT_SECRET` | Secret key for JWT signing | default-secret | ⚠️ Change in production |

**⚠️ Important**: Always change `JWT_SECRET` in production environments.

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

---

### User Endpoints

#### 1. Register New User
**Endpoint**: `POST /users/register`

**Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules**:
- `username`: 3-30 alphanumeric characters (required)
- `email`: Valid email format (required)
- `password`: Min 6 characters, must contain letters and numbers (required)

**Success Response** (201):
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- `400`: Validation failed - see errors array
- `409`: User already exists
- `500`: Internal server error

---

#### 2. Login User
**Endpoint**: `POST /users/login`

**Rate Limit**: 5 requests per 15 minutes

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules**:
- `email`: Valid email format (required)
- `password`: Non-empty string (required)

**Success Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:
- `400`: Validation failed
- `404`: User not found
- `401`: Invalid credentials
- `500`: Internal server error

---

#### 3. Logout User
**Endpoint**: `POST /users/logout`

**Authentication**: ✅ Required (Bearer token)

**Request Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**Success Response** (200):
```json
{
  "message": "Logout successful"
}
```

**Error Responses**:
- `401`: No token provided
- `403`: Invalid or expired token
- `500`: Internal server error

---

### Posts Endpoints

#### 1. Create Post
**Endpoint**: `POST /posts/create`

**Authentication**: ✅ Required (Bearer token)

**Rate Limit**: 10 requests per minute

**Request Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**Request Body**:
```json
{
  "name": "My First Post",
  "description": "This is a detailed description of my post with meaningful content.",
  "age": 25
}
```

**Validation Rules**:
- `name`: 3-100 characters (required)
- `description`: 10-1000 characters (required)
- `age`: Integer between 1-120 (required)

**Success Response** (201):
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "My First Post",
    "description": "This is a detailed description...",
    "age": 25,
    "createdAt": "2024-11-27T10:30:00Z",
    "updatedAt": "2024-11-27T10:30:00Z"
  }
}
```

**Error Responses**:
- `400`: Validation failed
- `401`: No token provided
- `403`: Invalid or expired token
- `500`: Internal server error

---

#### 2. Get All Posts
**Endpoint**: `GET /posts`

**Authentication**: ❌ Not required (Public)

**Query Parameters**: None

**Success Response** (200):
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "My First Post",
      "description": "This is a detailed description...",
      "age": 25,
      "createdAt": "2024-11-27T10:30:00Z",
      "updatedAt": "2024-11-27T10:30:00Z"
    }
  ]
}
```

---

#### 3. Get Single Post by ID
**Endpoint**: `GET /posts/:id`

**Authentication**: ❌ Not required (Public)

**URL Parameters**:
- `id` (required): MongoDB post ID

**Success Response** (200):
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "My First Post",
    "description": "This is a detailed description...",
    "age": 25,
    "createdAt": "2024-11-27T10:30:00Z",
    "updatedAt": "2024-11-27T10:30:00Z"
  }
}
```

**Error Responses**:
- `404`: Post not found
- `500`: Internal server error

---

#### 4. Update Post by ID
**Endpoint**: `PUT /posts/:id`

**Authentication**: ✅ Required (Bearer token)

**Request Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters**:
- `id` (required): MongoDB post ID

**Request Body** (at least one field required):
```json
{
  "name": "Updated Post Title",
  "description": "Updated description with new content.",
  "age": 26
}
```

**Validation Rules**:
- `name`: 3-100 characters (optional)
- `description`: 10-1000 characters (optional)
- `age`: Integer between 1-120 (optional)
- At least one field must be provided

**Success Response** (200):
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Updated Post Title",
    "description": "Updated description...",
    "age": 26,
    "createdAt": "2024-11-27T10:30:00Z",
    "updatedAt": "2024-11-27T10:35:00Z"
  }
}
```

**Error Responses**:
- `400`: Validation failed
- `401`: No token provided
- `403`: Invalid or expired token
- `404`: Post not found
- `500`: Internal server error

---

#### 5. Delete Post by ID
**Endpoint**: `DELETE /posts/:id`

**Authentication**: ✅ Required (Bearer token)

**Request Headers**:
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters**:
- `id` (required): MongoDB post ID

**Success Response** (200):
```json
{
  "message": "Post deleted successfully"
}
```

**Error Responses**:
- `401`: No token provided
- `403`: Invalid or expired token
- `404`: Post not found
- `500`: Internal server error

---

## Authentication

### JWT Token Format

Tokens are issued in JWT format with the following structure:
```
Bearer <token>
```

### Token Usage

Include the token in the `Authorization` header for all protected endpoints:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/v1/posts/create \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Post","description":"Description here","age":25}'
```

### Token Expiration

- **Expiration Time**: 7 days
- **Issued At**: On login and registration
- **Renewal**: Obtain a new token by logging in again

## Rate Limiting

The API implements rate limiting to prevent abuse:

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 15 minutes |
| User auth (register/login) | 5 requests | 15 minutes |
| Create post | 10 requests | 1 minute |

**Rate Limit Headers**:
```
RateLimit-Limit: 100
RateLimit-Remaining: 99
RateLimit-Reset: 1627000000
```

**Exceeding Rate Limit Response** (429):
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

## Validation

All request bodies are validated using Joi schemas. Validation errors provide detailed feedback:

**Example Error Response** (400):
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "username",
      "message": "Username must have at least 3 characters"
    },
    {
      "field": "password",
      "message": "Password must contain both letters and numbers"
    }
  ]
}
```

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── constants.js          # Application constants
│   │   └── database.js           # MongoDB connection configuration
│   ├── controllers/
│   │   ├── post.controller.js    # Post business logic
│   │   └── user.controller.js    # User business logic
│   ├── middlewares/
│   │   ├── auth.js               # JWT authentication middleware
│   │   ├── rateLimiter.js        # Rate limiting middleware
│   │   └── validator.js          # Request validation middleware
│   ├── models/
│   │   ├── post.model.js         # Post schema definition
│   │   └── user.model.js         # User schema definition
│   ├── routes/
│   │   ├── post.route.js         # Post routes
│   │   └── user.route.js         # User routes
│   ├── utils/
│   │   └── jwt.js                # JWT utility functions
│   ├── validators/
│   │   └── schemas.js            # Joi validation schemas
│   ├── app.js                    # Express app configuration
│   └── index.js                  # Application entry point
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Development

### Available Scripts

**Start development server with auto-reload**:
```bash
npm run dev
```

**Start production server**:
```bash
npm start
```

### Development Tools

- **Nodemon**: Automatically restarts server on file changes
- **Express**: RESTful API framework
- **Mongoose**: MongoDB ODM

### Testing Endpoints

Use curl, Postman, or any REST client:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123"}'

# Login
curl -X POST http://localhost:5000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'

# Create a post (use token from login)
curl -X POST http://localhost:5000/api/v1/posts/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"First Post","description":"This is my first post content","age":25}'
```

## Production Deployment

### Pre-deployment Checklist

- [ ] Set `JWT_SECRET` to a strong random string
- [ ] Set `MONGODB_URI` to production database
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Set up environment variables securely
- [ ] Configure CORS if needed
- [ ] Enable database backups
- [ ] Set up logging and monitoring
- [ ] Configure rate limiting appropriately

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=<production-mongodb-uri>
PORT=3000
JWT_SECRET=<strong-random-secret-key>
```

### Deployment Platforms

The app can be deployed to:
- Heroku
- AWS (EC2, Elastic Beanstalk, Lambda)
- Google Cloud Platform
- DigitalOcean
- Azure App Service
- Railway
- Render

### Example Heroku Deployment

```bash
heroku create your-app-name
heroku config:set JWT_SECRET=<strong-secret>
heroku config:set MONGODB_URI=<mongodb-uri>
git push heroku main
heroku logs --tail
```

## Security Considerations

### ✅ Implemented Security Features

1. **Password Hashing**: bcryptjs with salt rounds (10 iterations)
2. **JWT Authentication**: Token-based API authentication
3. **Rate Limiting**: Prevents brute force and DoS attacks
4. **Input Validation**: Joi schema validation for all inputs
5. **HTTPS Ready**: Configure SSL/TLS on production
6. **Environment Variables**: Sensitive data never hardcoded

### 🔒 Security Best Practices

1. **Never commit `.env` file**: Add to `.gitignore`
2. **Use strong JWT_SECRET**: Minimum 32 characters
3. **Enable HTTPS**: Always use HTTPS in production
4. **Update dependencies**: Regularly run `npm audit` and `npm update`
5. **Monitor logs**: Track suspicious activity
6. **Validate all inputs**: Trust nothing from the client
7. **Use CORS**: Configure CORS to allow only trusted origins
8. **Database security**: Use MongoDB Atlas with IP whitelist
9. **Rate limiting**: Adjust based on your API traffic
10. **Token rotation**: Encourage users to refresh tokens regularly

### Vulnerability Scanning

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Error Handling

The API returns consistent error responses:

### Error Response Format

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Validation failed |
| 401 | Unauthorized - Token missing or invalid |
| 403 | Forbidden - Token expired or insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the `package.json` file for details.

---

## Support

For support, email support@example.com or open an issue in the repository.

## Author

**Nkuin Eugene**

## Version

**1.0.0** - Initial release with user authentication, posts management, and security features

---

**Last Updated**: November 27, 2024

**Status**: ✅ Production Ready
