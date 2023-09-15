const Joi = require('joi');
const { validateErrorMessageList, regexpList, subscriptionList } = require('../../variables');

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default(subscriptionList[0]),
}).messages(validateErrorMessageList);

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
}).messages(validateErrorMessageList);

module.exports = {
  registerSchema,
  loginSchema,
};
