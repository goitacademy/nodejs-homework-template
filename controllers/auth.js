const authService = require("../service/auth");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.message });
  try {
    const result = await authService.signUser({ value, res });
    res.status(201).json({ user: result });
  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.message });
  try {
    const result = await authService.loginUser({ value, res });
    res.status(200).json({ result });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  signup,
  login,
};
