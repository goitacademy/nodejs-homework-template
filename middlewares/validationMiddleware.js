const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      email: Joi.string().email(),
      phone: Joi.string().min(3).max(15).required(),
    });
    const valid = schema.validate(req.body);

    if (valid.error) {
      res.status(400).json({
        status: valid.error,
      });
    }
    next();
  },
};
