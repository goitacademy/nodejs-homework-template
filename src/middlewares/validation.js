const Joi = require("joi");

const addContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing required name field" });
  }

  next();
};

const updateContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing fields" });
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
