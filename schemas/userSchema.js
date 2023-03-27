const joi = require("joi");

const addUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*\d{1,})(?=.*[a-z]+)(?=.*[A-Z]+)[0-9a-zA-Z]{8,}$/)
    .required(),
});

module.exports = {
  addUserSchema,
};
