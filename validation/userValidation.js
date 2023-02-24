const Joi = require('joi');

const schemaAddUser = Joi.object({
  subscription: Joi.string().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(20).required(),
});

const validate = require('./validation');

module.exports.validateUser = (req, res, next) => {
  return validate(schemaAddUser, req.body, next);
};
