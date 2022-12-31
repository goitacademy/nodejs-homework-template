const Joi = require("joi");

const postValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required field" });
  }

  next();
};

const putValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.number().integer().optional(),
  }).min(1);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: "try changing at least one field" });
  }

  next();
};

module.exports = {
  postValidation,
  putValidation,
};
