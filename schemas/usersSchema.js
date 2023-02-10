const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    password: Joi.string().pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
    email: Joi.string().email(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    token: Joi.string().token(),
  })
);

const atLeastOne = custom
  .object()
  .or('password', 'email', 'subscription', 'token');
const allRequired = custom
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
