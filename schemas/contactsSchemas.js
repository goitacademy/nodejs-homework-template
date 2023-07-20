import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

export default { contactsAddSchema };
