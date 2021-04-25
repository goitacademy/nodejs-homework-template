const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30),
  phone: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  favorite: Joi.boolean(),
}).xor("name", "phone", "email", "favorite");

const validate = (schema, body, next, messageError) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;
    console.log(message);

    return next({
      status: HttpCode.BAD_REQUEST,
      message: messageError,
      data: "Bad Request",
    });
  }

  next();
};

module.exports.validateCreateContacts = (req, res, next) => {
  return validate(
    schemaCreateContact,
    req.body,
    next,
    "missing required name field"
  );
};

module.exports.validateUpdateContacts = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next, "missing fields");
};

module.exports.validateUpdateStatusContact = (req, res, next) => {
  return validate(
    schemaUpdateStatusContact,
    req.body,
    next,
    "missing field favorite"
  );
};
