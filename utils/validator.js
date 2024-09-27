const Joi = require("joi");

exports.createUserDataValidator = (data) =>
    Joi.object()
        .options({abortEarly: false})
    .keys({
      name: Joi.string().min(3).max(12).required(),
      email: Joi.string().email(),
      phone: Joi.number(),
    })
    .validate(data);
