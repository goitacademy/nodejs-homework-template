const Joi = require("joi");


const contactSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" required field`}),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9()+\s-]+$/).required(),
});


module.exports = contactSchema;