const Joi = require("joi");

const emailmask =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonemask = /^s?[(][0-9]{3}[)][^0-9][0-9]{3}-[0-9]{4}$/;

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailmask),
  phone: Joi.string().pattern(phonemask),
});

module.exports = joiContactSchema;
