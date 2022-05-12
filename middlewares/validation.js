// middlewares - это ф-ция которая может сделать промежуточный этап обработки запроса
const Joi = require("joi");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^[a-zA-Z0-9]{3,30}$/;

const validateAddedContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(20).required(),
    favorite: Joi.boolean()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next(); // позволяет перейти к следующему выполнению кода
};

const validateUpdatedContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(20).required(),
    favorite: Joi.boolean()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};


const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(new RegExp(emailPattern)).required(),
    password: Joi.string().pattern(new RegExp(passwordPattern)).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);

  }

  next();
};

module.exports = {
  validateAddedContact,
  validateUpdatedContact,
  validateUser
};