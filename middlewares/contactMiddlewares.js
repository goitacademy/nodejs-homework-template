const Joi = require("joi");

  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  });
  const validateContact = async (req, res, next) => {
    const { error,value } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    req.body = value;
    next();
  };

  module.exports = {
    validateContact
  };