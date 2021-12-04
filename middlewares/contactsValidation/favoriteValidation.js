const Joi = require("joi");

const favoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};

module.exports = favoriteValidation;
