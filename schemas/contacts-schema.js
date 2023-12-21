import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().message({
    "any.required": "'name' must be input",
  }),
  number: Joi.number().required(),
});
