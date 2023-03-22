const Joi = require("joi");

exports.patchFavoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ status: result.error.details });
  }
  next();
};

exports.postContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ status: result.error.message });
  }
  next();
};

exports.putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).optional(),
    email: Joi.string().min(2).optional(),
    phone: Joi.number().min(2).optional(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ status: result.error.message });
  }
  next();
};
