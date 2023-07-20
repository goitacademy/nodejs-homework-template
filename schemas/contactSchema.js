import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^([0-9]{3}) ([0-9]{3})-([0-9]{4})$/)
    .required(),
});

export default contactSchema;
