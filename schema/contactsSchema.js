const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const validateData = (req, res, next) => {
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
        const errorMessage = `Missing required ${validationResult.error.details[0].context.key} field`;
        return res.status(400).json({ message: errorMessage });
    }
    next();
};

module.exports = {
    validateData,
};