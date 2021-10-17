const Joi = require('joi');
const { Subscription } = require('../config/constants');
const { HttpCode } = require('../config/constants');

const schemaUsersSignup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(10).required(),
});

const schemaUsersPatch = Joi.object({
  subscription: Joi.any()
    .valid(Subscription.STANDARD, Subscription.PREMIUM, Subscription.VIP)
    .required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: `Field ${error.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateUsersPatch = async (req, res, next) => {
  return await validate(schemaUsersPatch, req.body, res, next);
};

module.exports.validateUser = async (req, res, next) => {
  return await validate(schemaUsersSignup, req.body, res, next);
};
