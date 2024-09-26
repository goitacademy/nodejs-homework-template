const Joi = require("joi");
const { emailRegexp, listSubscription } = require("../constants");

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...listSubscription),
})

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userUpdateSubscriptionShema = Joi.object({
  subscription: Joi.string().valid(...listSubscription),
})

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSubscriptionShema,
};
