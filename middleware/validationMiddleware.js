const Joi = require("joi");

const validationCreatePost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }
  next();
};

const validationUpdatePost = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().alphanum(),
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }
  next();
};

module.exports = { validationCreatePost, validationUpdatePost };
