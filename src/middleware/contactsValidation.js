const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = {
  validateContactData(req, res, next) {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
      return;
    }

    next();
  },
};
