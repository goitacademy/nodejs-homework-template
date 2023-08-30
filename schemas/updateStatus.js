const Joi = require("joi");

const updateStatus = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "missing field favorite" }),
});

module.exports = updateStatus;