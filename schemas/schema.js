const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  favorite: Joi.boolean(),
});

// module.exports = { addSchema, updateSchema };
module.exports = { addSchema, updateSchema };
