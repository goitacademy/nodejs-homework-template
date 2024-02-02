import Joi from "joi";
export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const validateContact = (data) => {
  return contactSchema.validate(data);
};
