const Joi = require('joi');

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = patchSchema;
