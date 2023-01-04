const Joi = require("joi");
module.exports = {
  authValidation: (req, res, next) => {
    const scema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(7).max(20).required(),
    });
    const validateUser = scema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: validateUser.error, code: 400 });
    }
    next();
  },
};
