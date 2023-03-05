const Joi = require("joi");

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

module.exports = {
  
 joiRegisterSchema
};
