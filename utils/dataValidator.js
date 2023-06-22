const Joi = require("joi");
const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const dataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(5).max(15).required(),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

const userValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().pattern(EMAIL_PATTERN).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const favoriteValidator = (data) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = { dataValidator, favoriteValidator, userValidate };
