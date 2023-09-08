import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"title" must be exsit`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exsit`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exsit`,
  }),
});

export default contactSchema;
