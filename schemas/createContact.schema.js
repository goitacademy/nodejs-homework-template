const Joi = require("joi");
const { regName, regPhone, regEmail } = require("../regexp");

const createContactSchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  name: Joi.string().pattern(new RegExp(regName)).required(),
  email: Joi.string().email(regEmail).required(),
  phone: Joi.string().pattern(regPhone).required(),
  favorite: Joi.bool().required(),
});

module.exports = {
  createContactSchema,
};
