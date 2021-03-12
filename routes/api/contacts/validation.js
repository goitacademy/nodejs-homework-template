const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

const schemaAddContact = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(6).required(),
  subscription: Joi.string().optional(),
  password: Joi.string().optional(),
  token: Joi.string().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(1).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  phone: Joi.string().min(6).optional(),
  subscription: Joi.string().optional(),
  password: Joi.string().optional(),
  token: Joi.string().optional(),
}).or("name", "email", "phone", "subscription", "password", "token");

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "bad request",
    });
  }
  next();
};

module.exports.addContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
