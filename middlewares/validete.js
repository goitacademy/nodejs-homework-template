const Joi = require("joi");

const validateRequestBody = () => {
  const patternName = /^[a-zA-Z0-9_ ]*$/;
  const paternPhone = /^[0-9()-_ ]*$/;

  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(new RegExp(patternName))
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp(paternPhone)).required(),
  });

  return (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error.details[0].message,
      });
    }

    next();
  };
};

module.exports = { validateRequestBody };
