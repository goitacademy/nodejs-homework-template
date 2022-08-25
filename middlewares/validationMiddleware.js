const Joi = require("joi");

const validateAddContactFields = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7)
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

const validateUpdateContactFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

module.exports = {
  validateAddContactFields,
  validateUpdateContactFields,
};
