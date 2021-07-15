/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().alphanum().min(2).max(30),
  phone: Joi.string(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
