const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
);

const atLeastOne = custom.object().or('name', 'email', 'phone', 'favorite');
const allRequired = custom
  .object()
  .options({ presence: 'required' })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
