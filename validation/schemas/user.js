const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().token().min(6).max(24).required(),
});

function userValidation(req, res, next) {
  if (schema.validate(req.body).error) {
    res.status(400).json({ message: schema.validate(req.body).error.message });
  } else {
    next();
  }
}

module.exports = {
  userValidation,
};
