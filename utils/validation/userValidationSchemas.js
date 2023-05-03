const Joi = require("joi");
const addSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = {
  addSchema,
};
