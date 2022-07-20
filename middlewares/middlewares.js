const Joi = require("joi");

function middlewareForPost(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().required().positive(),
    email: Joi.string().required().min(3).max(30),
    favorite: Joi.bool().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

function middlewareForUpdate(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().positive().required(),
    email: Joi.string().min(3).max(30).required(),
    favorite: Joi.bool().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

function middlewareForUpdateStatus(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    phone: Joi.number().positive(),
    email: Joi.string().min(3).max(30),
    favorite: Joi.bool().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: "missing required name field" });
  }
}

function ctrlWrapper(ctrl) {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  middlewareForPost,
  middlewareForUpdate,
  ctrlWrapper,
  middlewareForUpdateStatus,
};
