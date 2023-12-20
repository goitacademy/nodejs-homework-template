import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

export default contactAddSchema;
