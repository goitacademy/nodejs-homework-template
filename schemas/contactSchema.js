import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `add "name" please`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required().messages({
    "any.required": `add "phone" please`,
  }),
});

export default contactAddSchema;
