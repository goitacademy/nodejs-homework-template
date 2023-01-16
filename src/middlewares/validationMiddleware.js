const Joi = require("joi");

module.exports = {
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(4).max(15).required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(4).max(15).optional().required(),
      email: Joi.string().optional().required(),
      phone: Joi.string().optional().required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
  putchContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ status: 400, message: validationResult.error.details });
    }
    next();
  },
};
