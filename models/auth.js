const joi = require("joi");

const scheme = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
});

const statusSchema = joi.object({
    favorite: joi.bool().required(),
  });
  
  module.exports = {
    scheme,
    statusSchema,
  };