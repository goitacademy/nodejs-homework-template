const Joi = require("joi");

exports.contactValidator = (data) => {
  return Joi.object()
    .keys({
      name: Joi.string().min(5).max(32).required().messages({
        "string.min": "Должно быть не менее {#limit} символов",
        "string.max": "Должно быть не более {#limit} символов",
        "any.required": "Это поле обязательно",
      }),
      phone: Joi.string().min(5).max(16).required().messages({
        "string.min": "Должно быть не менее {#limit} символов",
        "string.max": "Должно быть не более {#limit} символов",
        "any.required": "Это поле обязательно",
      }),
      email: Joi.string().email().required().messages({
        "string.min": "Должно быть не менее {#limit} символов",
        "string.max": "Должно быть не более {#limit} символов",
        "any.required": "Это поле обязательно",
      }),
    })
    .validate(data);
};
