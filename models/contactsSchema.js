const Joi = require("joi");

const schemaForCreate = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  phone: Joi.number().required(),
});

const schemaForUpdate = Joi.object({
  name: Joi.string().alphanum().min(2).max(20),
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  phone: Joi.number(),
});

module.exports = {
  schemaForCreate,
  schemaForUpdate,
};
