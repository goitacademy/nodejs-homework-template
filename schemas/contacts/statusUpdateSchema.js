const Joi = require("joi");

const statusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = statusUpdateSchema;
