const Joi = require("joi");
exports.contactsValidationSchema = (data) =>
  Joi.object()
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);
