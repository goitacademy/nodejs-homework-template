const Joi = require('joi');
const { ValidatoinError } = require('../helpers/errors');

module.exports = {
    userPostValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .pattern(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/)
                .required(),
            subscription: Joi.string()
                .valid("starter", "pro", "business")
                .optional(),
            avatarURL: Joi.string()
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

    userPatchValidation: (req, res, next) => {
        const schema = Joi.object({
            subscription: Joi.string()
                .valid("starter", "pro", "business")
                .required(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidatoinError("Missing field subscription"));
        }

        next();
    },
};