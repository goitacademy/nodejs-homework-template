const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[\w\s]+$/).trim().required().label('Name'),
  email: Joi.string().email().trim().min(3).max(20).required().label('Email'),
  phone: Joi.string().min(3).max(20).pattern(/^\(\d{3}\) \d{3}-\d{4}$/).trim().required().label('Phone Number')
}).unknown(false);

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).pattern(/^[\w\s]+$/).trim().label('Name'),
  email: Joi.string().min(3).max(20).email().trim().label('Email'),
  phone: Joi.string().min(3).max(20).pattern(/^\(\d{3}\) \d{3}-\d{4}$/).trim().label('Phone Number')
}).min(1);

const validator = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(detail => {
      if (detail.type === 'object.missing') {
        return `missing required '${detail.path[0]}' field`;
      }
      return detail.message;
    }).join(', ');
    return res.status(400).json({ message });
  }
  req.body = value;
  next();
};

const addContactValidator = validator(addContactSchema);
const updateContactValidator = validator(updateContactSchema);

module.exports = { addContactValidator, updateContactValidator };