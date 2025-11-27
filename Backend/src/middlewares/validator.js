// Validation middleware factory
export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Get all errors, not just the first one
            stripUnknown: true // Remove unknown properties
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        // Replace req.body with validated data
        req.body = value;
        next();
    };
};
