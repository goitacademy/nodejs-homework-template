const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const joiRegisterShema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()  
}) 

const joiLoginShema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()  
}) 

const userRegisterValidation = (req, res, next) => {
  const { error } = joiRegisterShema.validate(req.body);
  if (error) {
    next(new ValidationError("Ошибка от Joi или другой библиотеки валидации")); 
  }
  next();
}

const userLoginValidation = (req, res, next) => {
  const { error } = joiLoginShema.validate(req.body);
  if (error) {
    next(new ValidationError("Ошибка от Joi или другой библиотеки валидации")); 
  }
  next();
}

module.exports = {
  userRegisterValidation,
  userLoginValidation,  
};