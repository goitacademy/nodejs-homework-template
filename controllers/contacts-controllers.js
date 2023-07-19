const reqError = require("../helpers/reqError.js");
const joi = require("joi");
const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});
