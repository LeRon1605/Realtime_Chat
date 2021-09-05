const Joi = require('joi');

const schemas = {
    userSchema: Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    })
}

const validateBody = (schema) => {
    return (req, res, next) => {
        const validateResult = schema.validate(req.body);
        if (validateResult.error) req.error = validateResult.error;
        next();
    }
}

module.exports = {
    validateBody,
    schemas
}