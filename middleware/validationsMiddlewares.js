const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\w{3}\)\s\w{3}-\w{4}$/, "Unvalid number")
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const updateContactValidation = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0)
    return res.status(400).json({ message: "missing fields" });

  const schema = Joi.object({
    name: Joi.string().trim().min(2).optional(),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string()
      .pattern(/^\(\w{3}\)\s\w{3}-\w{4}$/, "Unvalid number")
      .optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { addContactValidation, updateContactValidation };
