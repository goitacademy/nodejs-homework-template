const Joi = require("joi");
const postValidationMiddleware = (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationData = contactSchema.validate(req.body);

  if (validationData.error) {
    return res.status(400).json({
      message: `missing required ${validationData.error.details[0].path} field`,
    });
  }
  next();
};

const putValidationMiddleware = (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationData = contactSchema.validate(req.body);

  if (validationData.error) {
    return res.status(400).json({
      message: validationData.error.details[0].message,
    });
  }
  next();
};

module.exports = {
  postValidationMiddleware,
  putValidationMiddleware,
};
