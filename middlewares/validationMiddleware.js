const Joi = require("joi");

const addPostValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()
      // .pattern(
      //   /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      // )
      .required(),
    favorite: Joi.boolean(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const { message } = validationResult.error.details[0];
    return res.status(400).json({ message: `Error field: ${message}` });
  }
  next();
};

const addFavoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const { message } = validationResult.error.details[0];
    return res.status(400).json({ message: `Error field: ${message}` });
  }
  next();
};

const addUserValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(8).required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const { message } = validationResult.error.details[0];
    return res.status(400).json({ message: `Error field: ${message}` });
  }
  next();
};

module.exports = {
  addPostValidation,
  addFavoriteValidation,
  addUserValidation,
};
