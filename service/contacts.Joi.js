const Joi = require('joi');

const newContactToValidate = Joi.object({
  name: Joi.string().trim().max(35).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const newContactJoiValidation = async (name, email, phone) => {
  await newContactToValidate.validateAsync({
    name: name,
    email: email,
    phone: phone,
  });
};

const editedContactToValidate = Joi.object()
  .keys({
    name: Joi.string().trim().max(35),
    email: Joi.string().email(),
    phone: Joi.string(),
  })
  .or('name', 'email', 'phone')
  .required();

const editedContactJoiValidation = async update => {
  await editedContactToValidate.validateAsync({
    name: update.name,
    email: update.email,
    phone: update.phone,
  });
};

const favToValidate = Joi.object({
  favorite: Joi.boolean().required(),
});

const favJoiValidation = async body => {
  await favToValidate.validateAsync(body);
};

module.exports = {
  newContactJoiValidation,
  editedContactJoiValidation,
  favJoiValidation,
};