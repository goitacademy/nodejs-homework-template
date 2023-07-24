import Joi from "joi";

const contactsAddSchema = Joi.object({
    name: Joi.string().required().messages({'any.required': 'missing required "name" field'}),
    email: Joi.string().required().messages({'any.required': 'missing required "email" field'}),
    phone: Joi.string().required().messages({'any.required': 'missing required "phone" field'}),
    favorite: Joi.boolean()
  })

  export default contactsAddSchema;