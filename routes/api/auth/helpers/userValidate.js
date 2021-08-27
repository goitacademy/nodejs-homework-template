const { required } = require("joi");
const Joi = require("joi");

function validateUserAuth(req, res, next) {
  const createUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
    verify: Joi.boolean()

  });
  const validate = createUserSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).send({ message: "missing required name field" });
  }
  next();
}

function validateLogin(req, res, next) {
  const loginUserValid = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const validate = loginUserValid.validate(req.body);
  if (validate.error) {
    return res.status(400).send({ message: "missing required name field" });
  }
  next();
}

function subscriptionValid(req, res, next) {
  const loginUserValid = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
  }).min(1);
  const validate = loginUserValid.validate(req.body);
  if (validate.error) {
    return res.status(400).send({ message: "missing required name field" });
  }
  next();
}

exports.validateUserAuth = validateUserAuth;
exports.validateLogin = validateLogin;
exports.subscriptionValid = subscriptionValid;
