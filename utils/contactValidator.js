const Joi = require('joi');

exports.contactValidate=(data) => Joi.object({
    name: Joi.string().min(3).required().messages({
        "any.required": "Поле name является обязательным"
    }),
  email: Joi.string().email().required().messages({
        "any.required": "Поле email является обязательным"
    }),
  phone: Joi.string().min(6).required().messages({
        "any.required": "Поле phone является обязательным"
    })
}).validate(data);