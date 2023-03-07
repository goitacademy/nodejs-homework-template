const Joi = require("joi");

const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
const userSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const userSchema = { userLogin, userSubscription };
module.exports = userSchema;
