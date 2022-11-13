const Joi = require("joi");

const { registration, login, logout } = require("../service/authService");

const schema = Joi.object({
  password: Joi.string().min(1).max(60).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  subscription: Joi.string(),
});

async function registrationController(req, res, next) {
  const { email, password, subscription } = req.body;

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: validationResult.error.details,
    });
  }

  const registeredUser = await registration(email, password, subscription);
  return res.status(201).json(registeredUser);
}

async function loginController(req, res, next) {
  const { email, password } = req.body;
  const loginResult = await login(email, password);
  return res.json(loginResult);
}

async function logoutController(req, res, next) {
  const logoutResult = await logout(req.user);
  return res.status(204).json(logoutResult);
}

async function currentController(req, res, next) {
  const { email, subscription } = req.user;
  const currentUser = { email, subscription };
  return res.status(200).json(currentUser);
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
};
