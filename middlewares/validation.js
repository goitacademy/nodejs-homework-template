const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/)
        .min(10)
        .max(18)
        .required()
        .messages("phone number must be in format (111) 111-1111"),
    });
    const validationSchema = schema.validate(req.body);

    if (validationSchema.error) {
      return res.status(404).json({ message: validationSchema.error.details });
    }

    next();
  },
  putContactValidation: (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string()
        .pattern(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/)
        .rule({ message: "phone number must be in format (111) 111-1111" })
        .min(10)
        .max(18)
        .optional(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res
        .status(404)
        .json({ message: validationSchema.error.details[0].message });
    }

    next();
  },
};
