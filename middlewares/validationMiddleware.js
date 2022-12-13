const Joi = require('joi');

const checkContactData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({status: validationResult.error.details});
  }
  next();
};

const addContact = checkContactData;

const updateContact = checkContactData;


module.exports = {
  addContact,
  updateContact
};