import Joi from "joi";

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  })

  export default {
    contactAddSchema,
  }