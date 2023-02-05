const Joi = require("joi");

const addValidation = (req, res, next) => {
  const schemaValidation = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
    favorite: Joi.boolean(),
  });

  const validationResult = schemaValidation.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }
  next();
};

module.exports = { addValidation };
