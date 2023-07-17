const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be less than or equal to 30 characters long",
    "string.empty": 'The "name" field must not be empty',
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": 'The "email" field must not be empty',
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.empty": 'The "phone" field must not be empty',
    "any.required": "Missing required phone field",
  }),
});

const validateBody = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      message: errorMessage,
    });
  }
  return next();
};

module.exports = validateBody;
