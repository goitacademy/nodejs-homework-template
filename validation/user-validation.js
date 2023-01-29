const Joi = require("joi");

const userSchema = Joi.object({
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .messages({ "any.required": "Password can consist only letters (Aa-Zz) and numbers (0-9)!" }),
    email: Joi.string().email().required().messages({ "any.required": "No valid email!" }),
});

module.exports = {
    userSchema,
}