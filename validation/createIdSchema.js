const Joi = require("joi");

const schema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({ "string.pattern.base": "Not valid ObjectID" });

module.exports = schema;
