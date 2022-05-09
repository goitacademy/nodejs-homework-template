const Joi = require("joi");

function middlewareForPost(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().required().positive(),
    email: Joi.string().required().min(3).max(30),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

function middlewareForUpdate(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    phone: Joi.number().positive(),
    email: Joi.string().min(3).max(30),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

module.exports = {
  middlewareForPost,
  middlewareForUpdate,
};
