const joi = require("joi");

const createUserValidator = (data) =>
  joi
    .object({
      name: joi.string().min(2),
      email: joi.string().min(6).email(),
      phone: joi.string().min(5),
    })
    .validate(data);

module.exports = { createUserValidator };
