const Joi = require("joi");

const dataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(5).max(15).required(),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

const favoriteValidator = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = { dataValidator, favoriteValidator };
