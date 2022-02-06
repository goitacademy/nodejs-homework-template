const Joi = require('joi');
const user = require('../../models/user');
const createError = require('http-errors');

function loginValidation(req, res, next) {
  const registerJoiSchema = Joi.object({
    email: Joi.string().pattern(user.emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  try {
    const { error } = registerJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loginValidation;
