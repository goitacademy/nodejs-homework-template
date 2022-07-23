const Joi = require("joi");

function middlewareForRegister(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(3).max(30),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

function middlewareForLogin(req, res) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(3).max(30),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

module.exports = {
  middlewareForRegister,
  middlewareForLogin,
};
