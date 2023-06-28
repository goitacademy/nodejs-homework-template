const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
//         .messages({
//     "string.base": `"name" should be a type of 'text'`,
//     "string.empty": `"name" cannot be an empty field`,
//   }),
    email: Joi.string().required(),
//         .messages({
//     "string.base": `"email" should be a type of 'text'`,
//     "string.empty": `"email" cannot be an empty field`,
//   }),
  phone: Joi.string().required(),
});

module.exports = {
  contactAddSchema,
};