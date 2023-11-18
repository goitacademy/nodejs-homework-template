const Joi = require('joi');



const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validateBody = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details });
      }
      next();
    };
  };
  module.exports = {
    contactSchema,
    validateBody
  };