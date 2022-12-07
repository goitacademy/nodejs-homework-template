const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required(),
      email: Joi.string().alphanum().required(),
      phone: Joi.string().alphanum().required(),
    });
    const validResult = schema.validate(req.body);
    if (validResult.error) {
      return res.status(400).json({ message: "missing required field" });
    }
    next();
  },
};