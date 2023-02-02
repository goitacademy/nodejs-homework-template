const Joi = require("joi");

module.exports = {
  addSchema: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(5).max(30).email().required(),
      phone: Joi.string().min(7).max(30).required(),
    });

    const validationData = contactSchema.validate(req.body);

    if (validationData.error) {
      return res.status(400).json({
        status: validationData.error.details[0].message,
        code: 400,
      });
    }
    next();
  },

  updateSchema: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().min(5).max(30).email(),
      phone: Joi.string().min(7).max(30),
    });

    const validationData = contactSchema.validate(req.body);

    if (validationData.error) {
      return res.status(400).json({
        status: validationData.error.details[0].message,
        code: 400,
      });
    }
    next();
  },
};