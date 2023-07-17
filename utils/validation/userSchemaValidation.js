const Joi = require("joi");

const addUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const schema = {
  addUserSchema,
};

module.exports = { schema };
