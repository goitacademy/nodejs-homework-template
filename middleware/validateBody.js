const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateBody = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const errorMessage = `missing required ${error.details[0].context.label} field`;
    return res.status(400).json({
      message: errorMessage,
    });
  }
  return next();
};

module.exports = validateBody;
