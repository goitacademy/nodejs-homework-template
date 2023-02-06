const Joi = require("joi");

const postContactSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("email", "phone")
  .messages({
    "object.missing":
      "One of [email] or [phone] values should be not null",
  });

const putContactSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "One of [name], [email] or [phone] values should be not null",
  });

module.exports = {
  postContactSchema,
  putContactSchema,
};
