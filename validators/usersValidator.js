{
  const Joi = require("joi");

  const validateRegistration = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(data);
  };

  const validateLogin = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validate(data);
  };

  module.exports = {
    validateRegistration,
    validateLogin,
  };
}
