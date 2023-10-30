const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      phone: Joi.string().min(10).max(20).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      }),
    });

    const validationResault = schema.validate(req.body);
    if (validationResault.error) {
      res.status(400).json({
        status: validationResault.error.details,
        code: 400,
        message: "missing required name field",
      });
    }
    next();
  },
};
