const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().optional(),
      phone: Joi.string()
        .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
        .optional(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.message,
      });
    }
    next();
  },

  putPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.message,
      });
    }
    next();
  },
  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.message,
      });
    }
    next();
  },
};
