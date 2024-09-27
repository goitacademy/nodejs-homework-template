import Joi from "joi";

const contactAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `"email" must be exist`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`,
  }),
});

export default {
  contactAddSchema,
};
