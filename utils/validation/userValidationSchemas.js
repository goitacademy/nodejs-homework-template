const Joi = require('joi');

const {
  validateErrorMessageList,
  regexpList,
  subscriptionList,
} = require('../../variables');

/**
 * Joi schema for validating the request body when registering a new user.
 */
const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default(subscriptionList[0]),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  password: registerUserSchema.extract('password'),
  email: registerUserSchema.extract('email'),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating a user's subscription.
 */
const updateSubscriptionUserSchema = Joi.object({
  subscription: registerUserSchema.extract('subscription').required(),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionUserSchema,
};

// This code defines three Joi schemas for validating the request body when registering a new user, logging in a user, and updating a user's subscription. Each schema specifies the expected data types, patterns, and requirements for the fields in the request body.

// 'registerUserSchema' is used for validating the request body when registering a new user. It requires the password and email fields, with a minimum password length of 6 characters. It also validates the email format and sets the default subscription based on the subscriptionList.

// 'loginUserSchema' is used for validating the request body when logging in a user. It requires the password and email fields and validates the email format.

// 'updateSubscriptionUserSchema' is used for validating the request body when updating a user's subscription. It requires the subscription field and validates that it matches one of the allowed subscription types.

// These schemas help ensure that incoming request data conforms to the expected format and constraints, making your user-related API operations more robust and secure.
