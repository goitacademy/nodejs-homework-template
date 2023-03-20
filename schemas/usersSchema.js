const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    password: Joi.string(),
    email: Joi.string().email(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  })
);

const adressURL = Joi.object({
  avatarURL: Joi.string().uri(),
});

const atLeastOne = custom.object().or('password', 'email', 'subscription');
const allRequired = custom
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
  adressURL,
};
