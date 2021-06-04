const Joi = require('joi');

const validateNewUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(5).max(25).required(),
});

const validateLoginUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validate = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationNewUser: (req, res, next) => {
    return validate(validateNewUser, req.body, next);
  },
  validationLoginUser: (req, res, next) => {
    return validate(validateLoginUser, req.body, next);
  },
};
