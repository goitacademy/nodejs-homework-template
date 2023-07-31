const Joi = require("joi");

const joiUserPatchSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = joiUserPatchSchema;
