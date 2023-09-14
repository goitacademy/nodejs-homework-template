const Joi = require('joi');

const newUserToValidate = Joi.object({
  password: Joi.string().trim().max(35).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const newUserJoiValidation = async (password, email, subscription) => {
  await newUserToValidate.validateAsync({
    password: password,
    email: email,
    subscription: subscription,
  });
};

const logUserJoiValidation = async (password, email) => {
  await newUserToValidate.validateAsync({
    password: password,
    email: email,
  });
};

module.exports = {
  newUserJoiValidation,
  logUserJoiValidation,
};