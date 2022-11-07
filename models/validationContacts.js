const Joi = require("joi");

module.exports = {
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(3).max(25).required(),
    });

    const validationResalt = schema.validate(req.body);
    if (validationResalt.error) {
      return res.status(400).json({ status: validationResalt.error.details });
    }
    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      email: Joi.string().min(3).max(30).optional(),
      phone: Joi.string().min(3).max(30).optional(),
    });

    const validationResalt = schema.validate(req.body);
    if (validationResalt.error) {
      return res.status(400).json({ status: validationResalt.error.details });
    }
    next();
  },
};
