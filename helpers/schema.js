const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(22).required(),
});
const changeContactShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(22),
}).or("name", "email", "phone");

module.exports = {
  addValidate: addContactSchema,
  putValidate: changeContactShema,
};
