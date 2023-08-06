const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const isValidIdSchema = Joi.object({
  _id: Joi.objectId().required(),
});

module.exports = isValidIdSchema;