const Joi = require("joi");

function validationResult(schema, response, request, next) {
  const validationRes = schema.validate(request.body);

  if (validationRes.error) {
    console.log(validationRes.error);
    return response.status(400).json({ message: validationRes.error.message });
  }
  next();
}

function postValidationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  validationResult(schema, res, req, next);
}

function updateValidationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
  });
  validationResult(schema, res, req, next);
}

function userRegDataValidationSchema(req, res, next) {
  const schema = Joi.object({
    password: Joi.string().min(3).max(15).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  validationResult(schema, res, req, next);
}

module.exports = {
  postValidationSchema,
  updateValidationSchema,
  userRegDataValidationSchema,
};
