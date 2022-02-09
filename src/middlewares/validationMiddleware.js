const Joi = require("joi");

module.exports = {
  joiSchema: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required(),
      phone: Joi.string(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ satus: validationResult.error.details });
    }

    next();
  },    
};
