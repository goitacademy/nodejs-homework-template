const Joi = require("joi");

const addRegisterSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const addLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const schema = {
  addRegisterSchema,
  addLoginSchema,
};

module.exports = { schema };
