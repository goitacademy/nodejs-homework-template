const Joi = require('joi');

const custom = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+) ([A-Z]+'?[a-z]+|[A-Z][a-z]+'?[a-z]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
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
