const Joi = require('joi');
const { validateErrorMessageList, regexpList } = require('../../variables');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpList.email).required(),
  phone: Joi.string().pattern(regexpList.phone).required(),
  favorite: Joi.boolean().default(false),
}).messages(validateErrorMessageList);

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(regexpList.email),
  phone: Joi.string().pattern(regexpList.phone),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages(validateErrorMessageList);

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  ...validateErrorMessageList,
  'any.required': 'missing field favorite',
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
