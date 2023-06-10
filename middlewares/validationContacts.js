const Joi = require("joi");

const addValidation = (req, res, next) => {
  const schema = Joi.object(
    {
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.alternatives([Joi.string(), Joi.number()]).required(),
      favorite: Joi.bool(),
    },
    { allowUnknown: false }
  );

  const validateSchema = schema.validate(req.body);
  if (validateSchema.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object(
    {
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }),
      phone: Joi.alternatives([Joi.string(), Joi.number()]),
      favorite: Joi.bool(),
    },
    { allowUnknown: false }
  );

  const validateSchema = schema.validate(req.body);
  if (validateSchema.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

const statusValidation = (req, res, next) => {
  const schema = Joi.object(
    {
      favorite: Joi.bool().required(),
    },
    { allowUnknown: false }
  );

  const validateSchema = schema.validate(req.body);
  if (validateSchema.error) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

module.exports = {
  addValidation,
  updateValidation,
  statusValidation,
};