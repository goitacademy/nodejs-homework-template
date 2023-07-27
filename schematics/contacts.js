const Joi = require('joi');

const addSchematic = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(9).required(),
});

module.exports = { addSchematic };