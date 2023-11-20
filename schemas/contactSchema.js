const Joi = require('joi');



const contactValidSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
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
    contactValidSchema,
    validateBody
  };