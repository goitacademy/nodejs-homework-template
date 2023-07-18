import Joi from "joi";

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
}) 

export default contactsSchema;
