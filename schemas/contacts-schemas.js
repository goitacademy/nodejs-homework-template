import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).options({
  messages: { "any.required": "missing required {{#label}} field" },
});
export default { contactAddSchema };
