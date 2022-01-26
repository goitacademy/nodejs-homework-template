const Joi = require("joi");

module.exports = {
  addValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    next();
  },
};
