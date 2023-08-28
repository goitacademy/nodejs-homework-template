const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body)

  if (validationBody.error) {
    return res.status(400).json({ message: validationBody.error.message })
  }
  next()
};

module.exports = {
  contactValidation: (req, res, next) => {
    return validate(schema, res, req, next)
  }
}