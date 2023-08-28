const Joi = require("joi");

const updateStatus = Joi.object({
  favorite: Joi.boolean().valid(true, false).required(),
});

module.exports = updateStatus;