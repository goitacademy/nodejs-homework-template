const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreate = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk", "ru", "ua", "org"] },
    })
    .required(),
  phone: Joi.string().min(1).max(50).required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "uk", "ru", "ua", "org"] },
    })
    .optional(),
  phone: Joi.string().alphanum().min(1).max(50).optional(),
});

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: "missing fields",
      data: "Bad Request",
    });
  }
  console.log(body);
  const { error } = schema.validate(body);
  if (error) {
    const labelArray = error.details.map((detail) => {
      return detail.context.label;
    });
    const label = labelArray[0];
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `missing required ${label} field`,
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreate, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdate, req.body, next);
};
