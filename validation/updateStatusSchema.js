const Joi = require("joi");

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().optional().required(),
});
module.exports = schemaUpdateStatus;
