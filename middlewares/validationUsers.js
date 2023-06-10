const Joi = require("joi");

const validationUser = (req, res, next) => {
  const schema = Joi.object(
    {
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(6).alphanum().required(),
    },
    { allowUnknown: false }
  );

  const validateSchema = schema.validate(req.body);
  if (validateSchema.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

module.exports = validationUser;
