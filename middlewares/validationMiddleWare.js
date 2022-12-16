const Joi = require("Joi");
const pattern = "^[0-9]{7,13}$";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.string().pattern(new RegExp(pattern)).required(),
});

const addContactValidation = (req, res, next) => {
  const { body } = req;
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const validationResult = schema.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error });
  }
  next();
};

const schemaPatch = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .optional(),
  phone: Joi.string().pattern(new RegExp(pattern)).optional(),
});

const changeContactValidation = (req, res, next) => {
  const { body } = req;
  const { name, email, phone } = body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const validationResult = schemaPatch.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error });
  }
  next();
};

module.exports = { addContactValidation, changeContactValidation };
