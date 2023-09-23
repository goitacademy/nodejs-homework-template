const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

function validateContact(dto) {
  return schema.validate(dto);
}

module.exports = {
  validateContact,
};
