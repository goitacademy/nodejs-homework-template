const Joi = require('joi');

// const emailRegexp =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = contactsSchema;
