const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{3}-\d{2}-\d{2}$/).required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^\d{3}-\d{2}-\d{2}$/).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const [{ message }] = error.details;
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: `Bad Request - ${message}`,
      data: 'Bad Request',
    });
  }

  next();
};

module.exports.createContactSchema = createContactSchema;
module.exports.updateContactSchema = updateContactSchema;
module.exports.validateCreateContact = validate(createContactSchema);
module.exports.validateUpdateContact = validate(updateContactSchema);
