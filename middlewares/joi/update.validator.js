const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Z]|[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(20),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  phone: Joi.string()
    .trim()
    .min(6)
    .max(12)
    .pattern(/^[0-9]+$/),
});

const updateValidator = (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  const { name, email, phone } = value;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = updateValidator;
