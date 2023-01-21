const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
});

function postValidation(req, res, next) {
  if (postSchema.validate(req.body).error) {
    res.status(400).json({ message: postSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .optional(),
}).min(1);

function putValidation(req, res, next) {
  if (putSchema.validate(req.body).error) {
    res.status(400).json({ message: putSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

const patchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

function patchValidation(req, res, next) {
  if (patchSchema.validate(req.body).error) {
    res.status(400).json({ message: patchSchema.validate(req.body).error.message });
  } else {
    next();
  }
}

module.exports = {
  postValidation,
  putValidation,
  patchValidation,
};
