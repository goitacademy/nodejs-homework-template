const Joi = require("joi");

const addPostValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    const missingLabel = validationRes.error.details[0].context.label;
    return res
      .status(400)
      .json({ message: `missing required ${missingLabel} field` });
  }
  next();
};

const updatePostValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    const missingLabel = validationRes.error.details[0].context.label;
    return res.status(400).json({ message: `missing ${missingLabel} field` });
  }
  next();
};

module.exports = { addPostValidation, updatePostValidation };
