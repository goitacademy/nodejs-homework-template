const Joi = require('joi')

const createUserDataValidator = (data) =>
  Joi
    .object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(15).required(),
    })
    .validate(data);

const updateUserDataValidator = (data) =>
    Joi
      .object()
      .keys({
        name: Joi.string().min(3).max(12),
        email: Joi.string().email(),
        phone: Joi.string().min(10).max(15),
      })
      .validate(data);

module.exports = {
    createUserDataValidator,
    updateUserDataValidator
}
