const Joi = require('joi');

const contactValidation = () => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().integer().required(),
  });

  return schema;
};

const postValidation = (req, res, next) => {
  const validationResult = contactValidation().validate(req.body);
  validationResult.error
    ? res.status(400).json({ message: 'missing required field' })
    : next();
};

const putValidation = (req, res, next) => {
  const schema = contactValidation().min(1);
  const validationResult = schema.validate(req.body);
  validationResult.error
    ? res.status(400).json({ message: 'try changing at least one field' })
    : next();
};

module.export = {
  postValidation,
  putValidation,
};
