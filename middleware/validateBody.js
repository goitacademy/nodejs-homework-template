const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateBody = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports = validateBody;
