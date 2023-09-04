import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) //"123-456-7890"
    .required()
    .messages({
      "string.pattern.base": `Phone number must have schema "(***) ***-****".`,
    }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string()
    .regex(/^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) //"123-456-7890"
    .messages({
      "string.pattern.base": `Phone number must have schema "(***) ***-****".`,
    }),
});

export default { contactAddSchema, contactUpdateSchema };
