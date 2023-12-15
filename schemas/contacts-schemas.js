import Joi from "joi";

const addMsg = "missing required name field";
const updMsg = "missing fields";

export const contactAddScheme = Joi.object({
  name: Joi.string().required().messages({ "any.required": addMsg }),
  email: Joi.string().email().required().messages({ "any.required": addMsg }),
  phone: Joi.string().required().messages({ "any.required": addMsg }),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
