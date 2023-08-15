const Joi = require("joi");
const { findUser, checkUser } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const schemaRegistration = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  })
  .external(findUser);

const schemaLogin = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
// .external(checkUser);

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);

    return next();
  } catch (err) {
    next({
      status: err.status || 400,
      message: err.message.replace(/"/g, "'"),
      data: err.message.replace(/"/g, "'"),
    });
  }
};

module.exports = {
  registration: async (req, res, next) => {
    return await validate(schemaRegistration, req.body, next);
  },
  login: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next);
  },
  // updateSubscription: async (req, res, next) => {
  //   return await validate(schemaSubscription, req.body, next);
  // },
};
