const Joi = require('joi');
const { assyncWrapper, RequestError } = require('../');

const schema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().min(8).max(25).required(),
  phone: Joi.string().min(9).max(15).required(),
  favorite: Boolean,
});

const validateData = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  next();
};

module.exports = assyncWrapper(validateData);
