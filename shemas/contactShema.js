const joi = require("joi");

const contactAddShema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

module.exports = { add: contactAddShema };
