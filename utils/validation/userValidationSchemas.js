const Joi = require('joi');

const {
  validateErrorMessageList,
  regexpList,
  subscriptionList,
} = require('../../variables');

const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default(subscriptionList[0]),
}).messages(validateErrorMessageList);

const loginUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
}).messages(validateErrorMessageList);

const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionUserSchema,
};
