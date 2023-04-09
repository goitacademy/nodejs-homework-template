const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" can't be empty`,
  }),
  email: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
  phone: Joi.string().required().messages({
    "string.empty": `"email" can't be empty`,
  }),
});
module.exports = {
  addSchema,
};
