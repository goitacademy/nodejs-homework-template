import Joi from "joi";

const addContactSchema = Joi.object({
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
const updateContactSchema = Joi.object()
  .required()
  .messages({ message: "missing fields" });

export default { addContactSchema, updateContactSchema };
