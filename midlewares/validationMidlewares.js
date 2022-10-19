const Joi = require("joi");

module.exports = {
    addContactValidation: (req, res, next) => {
        const model = Joi.object({
            name: Joi.string().alphanum.required(),
            email: Joi.string().alphanum.required(),
            phone: Joi.string().alphanum.required(),
        });
        const validResult = model.validate(req.body);
        if (validResult.error) {
            return res.status(400).json({ message: "Missing required field"});
        }
        next();
    },
};