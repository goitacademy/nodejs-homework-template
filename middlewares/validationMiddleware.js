const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(5).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error?.details[0].type === "any.required") {
      return res.status(400).json({ message: "missing required name field" });
    }
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
};
