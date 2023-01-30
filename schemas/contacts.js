const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "name.required": "you should provide name!!",
  }),
  phone: Joi.string()
    .min(10)
    .required()
    .messages({ "phone.required": "you should provide phone!!" }),
  email: Joi.string(),
});

module.exports = {
  addContactSchema,
};
