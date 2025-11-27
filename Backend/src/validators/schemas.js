import Joi from 'joi';

// User registration schema
export const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.alphanum': 'Username must contain only letters and numbers',
            'string.min': 'Username must have at least 3 characters',
            'string.max': 'Username cannot exceed 30 characters',
            'any.required': 'Username is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .messages({
            'string.min': 'Password must have at least 6 characters',
            'string.max': 'Password cannot exceed 50 characters',
            'string.pattern.base': 'Password must contain both letters and numbers',
            'any.required': 'Password is required'
        })
});

// User login schema
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        })
});

// Post creation schema
export const createPostSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Post name must have at least 3 characters',
            'string.max': 'Post name cannot exceed 100 characters',
            'any.required': 'Post name is required'
        }),
    description: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.min': 'Description must have at least 10 characters',
            'string.max': 'Description cannot exceed 1000 characters',
            'any.required': 'Description is required'
        }),
    age: Joi.number()
        .integer()
        .min(1)
        .max(120)
        .required()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be at least 1',
            'number.max': 'Age cannot exceed 120',
            'any.required': 'Age is required'
        })
});

// Post update schema
export const updatePostSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Post name must have at least 3 characters',
            'string.max': 'Post name cannot exceed 100 characters'
        }),
    description: Joi.string()
        .min(10)
        .max(1000)
        .optional()
        .messages({
            'string.min': 'Description must have at least 10 characters',
            'string.max': 'Description cannot exceed 1000 characters'
        }),
    age: Joi.number()
        .integer()
        .min(1)
        .max(120)
        .optional()
        .messages({
            'number.base': 'Age must be a number',
            'number.min': 'Age must be at least 1',
            'number.max': 'Age cannot exceed 120'
        })
}).min(1).messages({
    'object.min': 'At least one field must be provided for update'
});
