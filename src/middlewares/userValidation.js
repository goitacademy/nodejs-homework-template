const Joi = require('joi');
const { ValidatoinError } = require('../helpers/errors');

module.exports = {
    userValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .pattern(/^[\w.]+@[\w]+.[\w]+$/)
                .error(new Error("Invalid email format example@example.com"))
                .required(),
            subscription: Joi.string()
                .valid("starter", "pro", "business")
                .optional(),
            token: Joi.string()
                .optional(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidatoinError("Invalid fields"));
        }

        next();
    },
};