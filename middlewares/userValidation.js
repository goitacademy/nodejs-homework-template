const Joi = require("joi");

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^[a-zA-Z0-9]{3,30}$/;

const userValidation = (req, res, next) => {
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


module.exports = userValidation;