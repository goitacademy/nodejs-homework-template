const Joi = require("joi");

const contactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(25).required(),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "org", "net", "uk", "ua", "ru"] },
      })
      .required(),
    phone: Joi.number().required(),
    favorite: Joi.boolean(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: result.error.message,
    });
    return;
  }
  next();
};
module.exports = {
  contactsValidation,
};
