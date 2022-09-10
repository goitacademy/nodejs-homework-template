const Joi = require("joi");

module.exports = {
  userMiddleare: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(32).required(),
      password: Joi.string().alphanum().min(3).max(32).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({
        message: "error",
        description: "Not successful, unknown error",
      });
    }
    next();
  },

  depositMiddleare: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(32).required(),
      amount: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({
        message: "error",
        description: "Not successful, unknown error",
      });
    }
    next();
  },
  rollbackMiddleare: (req, res, next) => {
    const schema = Joi.object({
      deposit_id: Joi.string().alphanum().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({
        message: "error",
        description: "Not successful, unknown error",
      });
    }
    next();
  },
  createGameMiddleare: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required(),
      title: Joi.string().required(),
      price: Joi.number().integer().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({
        message: "error",
        description: "Not successful, unknown error",
      });
    }
    next();
  },
  buyGameMiddleare: (req, res, next) => {
    const schema = Joi.object({
      game_id: Joi.string().alphanum().required(),
      username: Joi.string().alphanum().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(404).json({
        message: "error",
        description: "Not successful, unknown error",
      });
    }
    next();
  },
};
