const Joi = require("joi");

  const contactSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': `missing required name field`
      }),
    email: Joi.string().email().required().messages({
        'any.required': `missing required email field`
      }),
    phone: Joi.number().required().messages({
        'any.required': `missing required phone field`
      }),
  });
  const validateContact = async (req, res, next) => {
    const { error,value } = contactSchema.validate(req.body);
    if (error) {
        console.log(error.label)
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    req.body = value;
    next();
  };

  module.exports = {
    validateContact
  };