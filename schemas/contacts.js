const Joi = require("joi");

const contactUpdateSchema = Joi.object({
    name: Joi.string().required().messages({
    //   "string.empty": "missing required name field",
    }),
    email: Joi.string().required().messages({
    //   "string.empty": "missing required email field",
    }),
    phone: Joi.string().required().messages({
    //   "string.empty": "missing required phone field",
    }),
});

module.exports = contactUpdateSchema