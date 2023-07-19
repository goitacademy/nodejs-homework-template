import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(14).required(),
});

export default { contactsAddSchema };
