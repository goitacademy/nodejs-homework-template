const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const validator = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "BAD REQUEST",
    });
  }
  next();
};

const schemaContactsCreate = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["uk", "gmail", "com", "net", "org"] },
    })
    .required(),

  phone: Joi.number().min(10).required(),
});

const schemaContactsUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required().optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["uk", "gmail", "com", "net", "org"] },
    })
    .required()
    .optional(),

  phone: Joi.number().min(10).required().optional(),
});

const validateContactsCreate = (req, res, next) => {
  return validator(schemaContactsCreate, req.body, next);
};
const validateContactsUpdate = (req, res, next) => {
  return validator(schemaContactsUpdate, req.body, next);
};

module.exports = { validateContactsCreate, validateContactsUpdate };
