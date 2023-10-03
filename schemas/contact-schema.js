import Joi from "joi";

const phonePattern =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const emailPattern =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(15).required().messages({
    "string.base": `"name" should be a type of text`,
    "string.empty": `"name" cannot be an empty string`,
    "string.min": `"name" should have minimum length of 2`,
    "any.required": `"name" is a required field`,
  }),
  phone: Joi.string()
    .trim()
    .min(5)
    .max(10)
    .required()
    .pattern(new RegExp(phonePattern))
    .messages({
      "string.base": `"phone" should be a type of text`,
      "string.empty": `"phone" cannot be an empty string`,
      "string.pattern.base": `"phone" should have at least 5 numbers and it can be divided by "-"`,
    }),
  email: Joi.string().pattern(new RegExp(emailPattern)),
});

export default contactSchema;
