const Joi = require("joi");

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.message });
  }
  next();
};

const validationData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(7).max(10).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  checkValidation(schema, req, res, next);
};
const patchValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    phone: Joi.string().min(7).max(10).optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .optional(),
  });
  checkValidation(schema, req, res, next);
};

module.exports = { validationData, patchValidation };
